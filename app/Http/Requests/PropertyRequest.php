<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PropertyRequest extends FormRequest
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
        return [
            'contact_name' => 'nullable|string|max:100',
            'contact_phone' => 'nullable|string|max:20',
            'contact_link' => 'nullable|string|max:100',
            'region_id' => 'required|integer|exists:regions,id',
            'type' => 'nullable|in:casa,casa (condom.),sobrado,apartamento,apart. c/ elevad.,terreno,loja,garagem,sala,outros',
            'iptu' => 'nullable|numeric|min:0|max:9999999999',
            'description' => 'required|string|max:100',
            'price' => 'required|integer|min:0|max:9999999999',
            'land_area' => 'nullable|numeric|min:0|max:9999999999',
            'building_area' => 'nullable|numeric|min:0|max:99999',
            'image' => 'nullable|string',
            'address' => 'nullable|string|max:100',
            'rooms' => 'nullable|integer|min:0|max:99',
            'bathrooms' => 'nullable|integer|min:0|max:99',
            'suites' => 'nullable|integer|min:0|max:99',
            'garages' => 'nullable|integer|min:0|max:99',
            'floor' => 'nullable|integer|min:0|max:99',
            'building_floors' => 'nullable|integer|min:0|max:99',
            'property_floors' => 'nullable|integer|min:0|max:99',
            'delivery_key' => 'nullable|date',
            'building_area' => 'nullable|integer|min:0|max:9999',
            'installment_payment' => 'nullable|boolean',
            'incc_financing' => 'nullable|boolean',
            'documents' => 'nullable|boolean',
            'finsh_type' => 'nullable|string|max:60',
            'air_conditioning' => 'nullable|in:incluso,somente infra,não incluso',
            'garden' => 'nullable|boolean',
            'pool' => 'nullable|boolean',
            'balcony' => 'nullable|boolean',
            'acept_pets' => 'nullable|boolean',
            'acessibility' => 'nullable|boolean',
            'obs' => 'nullable|string|max:255',
        ];
    }
}