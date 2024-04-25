import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        theme_color: "#ff6633",
        background_color: "#ff6633",
        display: 'standalone',
        scope: "/",
        start_url: "/",
        name: "AB T\u00eanis",
        short_name: "AB T\u00eanis",
        description: "Campeonato de T\u00eanis Associa\u00e7\u00e3o Brasil",
        icons: [
            {
                src: "icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "icons/icon-256x256.png",
                sizes: "256x256",
                type: "image/png"
            },
            {
                src: "icons/icon-384x384.png",
                sizes: "384x384",
                type: "image/png"
            },
            {
                src: "icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png"
            },
            {
                src: "icons/maskable_icon_x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable"
            }
        ],
        screenshots: [
            {
                src: "icons/screenshot.png",
                sizes: "640x320",
                type: "image/png",
                /** @ts-expect-error */
                form_factor: "wide",
                label: "AB T\u00eanis"
            },
            {
                src: "icons/screenshot-320x640.png",
                sizes: "320x640",
                type: "image/png",
                /** @ts-expect-error */
                label: "AB T\u00eanis"
            }

        ]
    }
}