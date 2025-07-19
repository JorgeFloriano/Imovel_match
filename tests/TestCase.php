<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Proper Vite mock
        app()->bind(\Illuminate\Foundation\Vite::class, function () {
            return new class {
                public function __invoke($assets, $buildDirectory = 'build')
                {
                    return is_array($assets) ? $assets : [$assets];
                }

                public function __call($name, $arguments)
                {
                    // Handle asset() calls
                    if ($name === 'asset') {
                        return $arguments[0] ?? '';
                    }

                    // Handle reactRefresh() calls
                    if ($name === 'reactRefresh') {
                        return '';
                    }

                    // Default return empty array for other calls
                    return [];
                }

                // Explicitly handle these common Vite methods
                public function reactRefresh(): string
                {
                    return '';
                }

                public function asset(string $asset, string $buildDirectory = 'build'): string
                {
                    return $asset;
                }

                public function __toString(): string
                {
                    return '';
                }
            };
        });
    }
}
