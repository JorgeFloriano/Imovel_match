import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="bg-[#123251] text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md border-[1px] border-[#B8B8B8]">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Imóveis Match</span>
            </div>
        </>
    );
}
