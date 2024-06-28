import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        theme_color: "#006699",
        background_color: "#006699",
        display: 'standalone',
        scope: "/",
        start_url: "/",
        name: "AABB T\u00eanis",
        short_name: "AABB T\u00eanis",
        description: "Campeonato de T\u00eanis AABB",
        icons: [
            {
                src: "icons/icon-192x192.png",
                sizes: "192x192",
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
                src: "icons/icon-192x192.png",
                sizes: "640x320",
                type: "image/png",
                /** @ts-expect-error */
                form_factor: "wide",
                label: "AABB T\u00eanis"
            },
            {
                src: "icons/icon-192x192.png",
                sizes: "320x640",
                type: "image/png",
                /** @ts-expect-error */
                label: "AABB T\u00eanis"
            }

        ]
    }
}