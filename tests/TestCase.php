<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->mockVite();
    }

    protected function mockVite()
    {
        app()->bind(\Illuminate\Foundation\Vite::class, fn() => new class {
            public function __invoke($assets, $buildDirectory = null): string
            {
                return collect($assets)->map(fn($asset) => asset($asset))->implode('');
            }

            public function asset($asset, $buildDirectory = null): string
            {
                return asset($asset);
            }

            public function reactRefresh(): string
            {
                return '';
            }

            public function __call($method, $parameters)
            {
                return '';
            }
        });
    }
}
