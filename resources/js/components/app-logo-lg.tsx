import { SVGAttributes } from 'react';

export default function AppLogoLg(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <image xlinkHref="/logo_complete.png" className="inline" width={28} aria-label="Icon" />
        </svg>
    );
}
