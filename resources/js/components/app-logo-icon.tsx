import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} width="28" height="28" viewBox="1 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <image xlinkHref="/logo_m.png" className="inline" width={30} aria-label="Icon" />
        </svg>
    );
}
