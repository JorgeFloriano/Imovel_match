import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="bg-pc-blue text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md border-[1px] bc-pc-gray">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Tinder Home</span>
            </div>
        </>
    );
}
