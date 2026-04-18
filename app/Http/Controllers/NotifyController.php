<?php

namespace App\Http\Controllers;

use App\Class\Compatible;
use App\Models\Client;
use App\Models\Property;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotifyController extends Controller
{
    public function index()
    {
        $clients = Client::with('wishe.regions')->where('user_id', Auth::user()->id)->orderBy('name')->get();

        $propertyOptions = Property::where('user_id', Auth::id())->orderBy('description')->get()->map(fn($property) => [
            'value' => strval($property->id), // Convert to string
            'label' => $property->description,
        ])->prepend([
                    'value' => '0',
                    'label' => 'Customizado para o cliente',
                ])->all();

        foreach ($clients as $client) {
            $client->wishe->regions_descr = $client->wishe->regionsDescr();
        }

        return Inertia::render('notify/notify-index', [
            'clients' => $clients,
            'propertyOptions' => $propertyOptions
        ]);
    }

    public function property(Property $property)
    {
        Gate::authorize('show', $property);

        //$client = Client::find($client->id)->load('wishe.regions');
        $property = Property::find($property->id)->load('region');

        $property->typ = $property->typ();

        $clients = Client::with(['wishe.regions', 'user'])->where('user_id', Auth::user()->id)->get();

        foreach ($clients as $client) {

            $compatible = new Compatible($client, $property); // calss to compare client and property

            $client->wishe->typ = $client->wishe->typ();

            $client->wishe->regions_msg = $client->wishe->regionsMsg();

            $client->wishe->regions_descr = $client->wishe->regionsDescr();

            // Array of client region options ids
            $cli_reg_ids = $client->wishe->regions()->get()->pluck('id')->toArray();

            $client->wishe->typ_c = $compatible->string($client->wishe->type, $property->type)['class'];

            $client->wishe->range_c = $compatible->number($property->range(), $client->range())['class2'];

            $client->wishe->delivery_key_c = $compatible->date($client->wishe->delivery_key, $property->delivery_key)['class'];

            $client->wishe->building_area_c = $compatible->number($client->wishe->building_area, $property->building_area)['class'];

            $client->wishe->rooms_c = $compatible->number($client->wishe->rooms, $property->rooms)['class'];

            $client->wishe->suites_c = $compatible->number($client->wishe->suites, $property->suites)['class'];

            $client->wishe->garages_c = $compatible->number($client->wishe->garages, $property->garages)['class'];

            $client->wishe->balcony_c = $compatible->bool($client->wishe->balcony, $property->balcony)['class'];

            $client->wishe->region_c = $compatible->inArray($property->region->id ?? '', $cli_reg_ids ?? '')['class'];

            $client->wishe->pts = $compatible->pts;
        }

        // Convert to array after sorting
        $sortedClients = $clients->sortBy([ // Multi-level sorting
            ['pts', 'desc'], // Primary sort by pts descending
            ['name', 'asc'] // Secondary sort by client name ascending
        ])->values()->all();

        return Inertia::render('notify/notify-property', [
            'clients' => $sortedClients,
            'property' => $property
        ]);
    }

    public function generateMarketingText(Client $client)
    {
        // Generate marketing text based on client data
        $marketingText = $this->generateCustomMarketingText($client);
        $whatsappLink = $this->generateWhatsAppLink($client->phone, $marketingText);

        return response()->json([
            'marketingText' => $marketingText,
            'whatsappLink' => $whatsappLink
        ]);
    }

    private function generateWhatsAppLink($phone, $message)
    {
        $client_phone = preg_replace('/[^0-9]/', '', $phone);
        // Add country code 55 (Brazil) if it is 10 or 11 digits
        if (strlen($client_phone) == 10 || strlen($client_phone) == 11) {
            $client_phone = '55' . $client_phone;
        }
        return "https://api.whatsapp.com/send?phone={$client_phone}&text=" . rawurlencode($message);
    }

    private function generateCustomMarketingText(Client $client)
    {
        Gate::authorize('show', $client);

        $name = explode(' ', $client->name)[0];

        $properties = Property::with(['user', 'region'])->where('user_id', Auth::user()->id)->get();

        foreach ($properties as $property) {

            $compatible = new Compatible($client, $property); // calss to compare client and property

            $property->pts = $compatible->pts;
        }

        // Convert to array after sorting and taking only first 3
        $sortedProperties = $properties->sortBy([ // Multi-level sorting
            ['pts', 'desc'], // Primary sort by pts descending
            ['description', 'asc'] // Secondary sort by client name ascending
        ])->take(3)->values()->all();

        // Customize this function to generate the marketing text as needed
        $text = "\u{1f31f} *SEU FUTURO EM SOROCABA ESTÁ SENDO CONSTRUÍDO AGORA!* \u{1f31f}\n\n";
        $text .= "Olá " . $name . ", tudo bem! \u{1f60a}\n";
        $text .= "Que tal conhecer as *melhores oportunidades* para morar ou investir na cidade?\n";
        $text .= "\u{1f3af} *Temos ótimas opções que combinam perfeitamente com seu perfil!*\n\n";

        foreach ($sortedProperties as $index => $property) {
            $text .= "\u{1f3e1} *" . $property->description . "*\n";
            $text .= $property->obs . "\n\n";
        }

        $text .= "\u{2705} *VANTAGENS EXCLUSIVAS:*\n";
        $text .= "• Valorização garantida \u{1f4c8}\n";
        $text .= "• Condições que cabem no seu bolso \u{1f4b3}\n";
        $text .= "• Localização privilegiada \u{1f4cd}\n";
        $text .= "• Plantas inteligentes e modernas \u{1f3d7}\u{fe0f}\n\n";

        $text .= "\u{23f3} *Não deixe o tempo passar!*\n";
        $text .= "Sonhar alto também começa com um bom planejamento! \u{1f4ad}\u{1f511}\n\n";

        $text .= "\u{1f4ac} Fale comigo, te mostro as novidades e detalhes sobre esses e outros lançamentos! \u{1f4f2}\u{1f4ac} \n\n";

        $text .= "Adquirir um imóvel é mais que um investimento, é o começo de uma nova história. \u{2764}\u{fe0f}\u{1f3e1}\n\n";

        $text .= "Aguardo o seu retorno \u{1f60a}";
        return $text;
    }

    public function generatePropertyMarketingText(Client $client, Property $property)
    {
        // Generate marketing text based on client data
        $marketingText = $this->generateSpecificPropertyMarketingText($client, $property);
        $whatsappLink = $this->generateWhatsAppLink($client->phone, $marketingText);

        return response()->json([
            'marketingText' => $marketingText,
            'whatsappLink' => $whatsappLink
        ]);
    }

    private function generateSpecificPropertyMarketingText(Client $client, Property $property)
    {
        Gate::authorize('show', $client);
        Gate::authorize('show', $property);

        $name = explode(' ', $client->name)[0];

        // Customize this function to generate the marketing text as needed
        $text = "Olá " . $name . ", tudo bem! \u{1f60a}\n";
        $text .= "\u{2728} *QUE TAL CONHECER UMA ÓTIMA OPORTUNIDADE PARA MORAR OU INVESTIR EM SOROCABA?!* \n\n";

        $text .= "\u{1f3e1} *" . $property->description . "*\n";

        if (isset($property->obs)) {
            $text .= $property->obs . "\n";
        }

        $text .= "\n";

        if (isset($property->delivery_key)) {
            $text .= "\u{1f511} Previsão de entrega das chaves para " .
                ($property->delivery_key ? date('d/m/Y', strtotime($property->delivery_key)) : 'Não definida') .
                "\n";
        }

        if (isset($property->building_area) && $property->building_area > 0) {
            $text .= "\u{1f4d0} " . $property->building_area . " m² de área construída\n";
        }

        if (isset($property->rooms) && $property->rooms > 0) {
            $text .= "\u{1f6cf}\u{fe0f} " . $property->rooms . " dormitório" . ($property->rooms > 1 ? "s" : "") . "\n";
        }

        if (isset($property->suites) && $property->suites > 0) {
            $text .= "\u{1f6c1} " . $property->suites . " suíte" . ($property->suites > 1 ? "s" : "") . "\n";
        }

        if (isset($property->garages) && $property->garages > 0) {
            $text .= "\u{1f697} " . $property->garages . " vaga" . ($property->garages > 1 ? "s" : "") . " de garagem\n";
        }

        if (isset($property->balcony) && $property->balcony) {
            $text .= "\u{1f307} Com varanda\n";
        }

        if (isset($property->region)) {
            $text .= "\u{1f4cd} Localizado na região " . $property->region->name . "\n";
        }

        $text .= "\n\u{2705} *VANTAGENS EXCLUSIVAS:*\n";
        $text .= "• Valorização garantida \u{1f4c8}\n";
        $text .= "• Condições que cabem no seu bolso \u{1f4b3}\n";
        $text .= "• Localização privilegiada \u{1f4cd}\n";
        $text .= "• Planta inteligente e moderna \u{1f3d7}\u{fe0f}\n\n";

        $text .= "\u{23f3} *Não deixe o tempo passar!*\n";
        $text .= "Sonhar alto também começa com um bom planejamento! \u{1f4ad}\n\n";

        $text .= "\u{1f4ac} Fale comigo, te mostro as novidades e detalhes sobre esse e outros lançamentos! \u{1f4f2}\u{1f4ac} \n\n";

        $text .= "Adquirir um imóvel é mais que um investimento, é o começo de uma nova história. \u{1f3e1}\u{2764}\u{fe0f}\n\n";

        return $text;
    }
}
