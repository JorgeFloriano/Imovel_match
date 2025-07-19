<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Mock Vite for tests
        app()->bind(\Illuminate\Foundation\Vite::class, function () {
            return new class {
                public function __invoke($asset)
                {
                    return $asset;
                }
                public function __call($name, $arguments)
                {
                    return $arguments[0] ?? '';
                }
            };
        });
    }
}
