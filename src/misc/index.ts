export function buildRoute(params: { path, title, icon, class?, displayInMenu? }): RouteInfo {
    return {
        path: params.path,
        title: params.title,
        icon: params.icon,
        class: params.class || '',
        displayInMenu: params.displayInMenu === undefined || params.displayInMenu,
    } as RouteInfo;
}

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    displayInMenu: boolean;
}
