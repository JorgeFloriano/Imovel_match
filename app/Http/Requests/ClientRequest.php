<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Client;

class ClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $clientId = $this->route('client') ? $this->route('client')->id : null;

        return [
            // Client validation rules
            'name' => 'required|string|max:60',
            'phone' => 'required|string|max:20',
            'email' => [
                'nullable',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(Client::class)->ignore($clientId),
            ],
            'address' => 'nullable|string|max:100',
            'marital_status' => 'required|string',
            'need_financing' => 'required|boolean',
            'dependents' => 'required|integer|min:0',
            'profession' => 'required|string|max:60',
            'revenue' => 'required|numeric|min:0|max:9999999999',
            'capital' => 'required|numeric|min:0|max:9999999999',
            'fgts' => 'nullable|numeric|min:0|max:9999999999',
            'has_property' => 'required|boolean',
            'compromised_income' => 'required|numeric|min:0|max:100',

            // Wishes validation rules
            'region_id' => 'nullable|integer|exists:regions,id',
            'type' => 'nullable|in:casa,casa (condom.),sobrado,apartamento,apart. c/ elevad.,terreno,loja,garagem,sala,outros',
            'rooms' => 'nullable|integer|min:0|max:99',
            'bathrooms' => 'nullable|integer|min:0|max:99',
            'suites' => 'nullable|integer|min:0|max:99',
            'garages' => 'nullable|integer|min:0|max:99',
            'delivery_key' => 'nullable|date',
            'building_area' => 'nullable|integer|min:0|max:9999',
            'installment_payment' => 'nullable|boolean',
            'air_conditioning' => 'nullable|in:incluso,somente infra,não incluso',
            'garden' => 'nullable|boolean',
            'pool' => 'nullable|boolean',
            'balcony' => 'nullable|boolean',
            'acept_pets' => 'nullable|boolean',
            'acessibility' => 'nullable|boolean',
            'obs' => 'nullable|string|max:300',
            'selected_regions' => ['sometimes', 'array'],
            'selected_regions.*' => ['exists:regions,id'],
        ];
    }
}
