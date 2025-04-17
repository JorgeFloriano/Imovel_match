<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';
                if (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                }
            })();
        </script>

        <style>
            html { background-color: oklch(1 0 0); }
            html.dark { background-color: oklch(0.145 0 0); }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @routes
        
        @production
            @php
                $manifest = json_decode(file_get_contents(public_path('build/manifest.json')), true);
                $entry = $manifest['resources/js/app.tsx'];
            @endphp
            <link rel="stylesheet" href="{{ asset('build/' . $entry['css'][0]) }}">
            <script type="module" src="{{ asset('build/' . $entry['file']) }}"></script>
        @else
            @viteReactRefresh
            @vite(['resources/js/app.tsx'])
        @endproduction

        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>