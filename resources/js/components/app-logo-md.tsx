import { SVGAttributes } from 'react';

export default function AppLogoMd(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} fill="none" width="80" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <image xlinkHref="/logo_build.png" className="inline" width={80} aria-label="Icon" />
        </svg>
    );
}
