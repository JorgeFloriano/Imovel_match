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

    public function property( Property $property)
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

        return response()->json([
            'marketingText' => $marketingText
        ]);
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
        $text = "🌟 *SEU FUTURO EM SOROCABA ESTÁ SENDO CONSTRUÍDO AGORA!* 🌟\n\n";
        $text .= "Olá " . $name . ", tudo bem! 😊\n";
        $text .= "Que tal conhecer as *melhores oportunidades* para morar ou investir na cidade?\n";
        $text .= "🎯 *Temos ótimas opções que combinam perfeitamente com seu perfil!*\n\n";

        foreach ($sortedProperties as $index => $property) {
            $text .= "🏡 *" . $property->description . "*\n";
            $text .= $property->obs . "\n\n";
        }

        $text .= "✅ *VANTAGENS EXCLUSIVAS:*\n";
        $text .= "• Valorização garantida 📈\n";
        $text .= "• Condições que cabem no seu bolso 💳\n";
        $text .= "• Localização privilegiada 📍\n";
        $text .= "• Plantas inteligentes e modernas 🏗️\n\n";

        $text .= "⏳ *Não deixe o tempo passar!*\n";
        $text .= "Sonhar alto também começa com um bom planejamento! 💭🔑\n\n";

        $text .= "💬 Fale comigo, te mostro as novidades e detalhes sobre esses e outros lançamentos! 📲💬 \n\n";

        $text .= "Adquirir um imóvel é mais que um investimento, é o começo de uma nova história. ❤️🏡\n\n";

        $text .= "Aguardo o seu retorno 😊";
        return $text;
    }

    public function generatePropertyMarketingText(Client $client, Property $property)
    {
        // Generate marketing text based on client data
        $marketingText = $this->generateSpecificPropertyMarketingText($client, $property);

        return response()->json([
            'marketingText' => $marketingText
        ]);
    }

    private function generateSpecificPropertyMarketingText(Client $client, Property $property)
    {
        Gate::authorize('show', $client);
        Gate::authorize('show', $property);

        $name = explode(' ', $client->name)[0];

        // Customize this function to generate the marketing text as needed
        $text = "Olá " . $name . ", tudo bem! 😊\n";
        $text .= "🌟 *QUE TAL CONHECER UMA ÓTIMA OPORTUNIDADE PARA MORAR OU INVESTIR EM SOROCABA?!* 🌟\n\n";

        $text .= "🏡 *" . $property->description . "*\n";
        $text .= $property->obs . "\n\n";

        $text .= "✅ *VANTAGENS EXCLUSIVAS:*\n";
        $text .= "• Valorização garantida 📈\n";
        $text .= "• Condições que cabem no seu bolso 💳\n";
        $text .= "• Localização privilegiada 📍\n";
        $text .= "• Planta inteligente e moderna 🏗️\n\n";

        $text .= "⏳ *Não deixe o tempo passar!*\n";
        $text .= "Sonhar alto também começa com um bom planejamento! 💭🔑\n\n";

        $text .= "💬 Fale comigo, te mostro as novidades e detalhes sobre esse e outros lançamentos! 📲💬 \n\n";

        $text .= "Adquirir um imóvel é mais que um investimento, é o começo de uma nova história. ❤️🏡\n\n";

        $text .= "Aguardo o seu retorno 😊";
        return $text;
    }
}
