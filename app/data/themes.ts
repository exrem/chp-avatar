interface RectangledBackground {
    rectangleColours: string[]
    rectangleHeights?: number[]
    rectangleWidths?: number[]
}

interface GradientBackground {
    gradientAngle: number
    gradientColours: string[]
    gradientPositions: number[]
}

interface Theme {
    name: string
    background: RectangledBackground | GradientBackground
    foreground?: string
}

interface ThemeGroup {
    name: string
    themes: Theme[]
}

export default <ThemeGroup[]>[
    {
        name: 'CHP Officials',
        themes: [
            {
                name: 'Marroon',
                background: {
                    rectangleColours: ['#B10A29']
                }
            },
            {
                name: 'Red',
                background: {
                    rectangleColours: ['#E30A17']
                }
            }
        ]
    },
    {
        name: 'Pride Flags',
        themes: [
            {
                name: 'Bisexual',
                background: {
                    rectangleColours: ['#0038A8', '#9B4F96', '#D60270'],
                    rectangleHeights: [1, 3 / 5, 2 / 5]
                }
            },
            {
                name: 'LGBT Pride',
                background: {
                    rectangleColours: ['#770088', '#004CFF', '#028121', '#FFEE00', '#FF8D00', '#E50000'],
                    rectangleHeights: [1, 5 / 6, 4 / 6, 3 / 6, 2 / 6, 1 / 6]
                }
            },
            {
                name: 'Pansexual',
                background: {
                    rectangleColours: ['#21B1FF', '#FFD800', '#FF218C'],
                    rectangleHeights: [1, 2 / 3, 1 / 3]
                }
            },
            {
                name: 'Transgender',
                background: {
                    rectangleColours: ['#5BCEFA', '#F5A9B8', '#FFFFFF', '#F5A9B8', '#5BCEFA'],
                    rectangleHeights: [1, 4 / 5, 3 / 5, 2 / 5, 1 / 5]
                }
            }
        ]
    },
    {
        name: 'Social Media',
        themes: [
            {
                name: 'Discord',
                background: {
                    rectangleColours: ['#5865F2']
                }
            },
            {
                name: 'Twitter',
                background: {
                    rectangleColours: ['#1D9BF0']
                }
            },
            {
                name: 'WhatsApp',
                background: {
                    rectangleColours: ['#25D366']
                }
            },
            {
                name: 'Spotify',
                background: {
                    rectangleColours: ['#1ED760']
                },
                foreground: '#000000'
            }
        ]
    },
    {
        name: 'Sports Clubs',
        themes: [
            {
                name: 'Galatasaray',
                background: {
                    rectangleColours: ['#B81B3F']
                },
                foreground: '#F3AB17'
            },
            {
                name: 'Fenerbahçe',
                background: {
                    rectangleColours: ['#163962']
                },
                foreground: '#FFED00'
            },
            {
                name: 'Beşiktaş',
                background: {
                    rectangleColours: ['#000000']
                }
            },
            {
                name: 'Trabzonspor',
                background: {
                    rectangleColours: ['#5A0E27']
                },
                foreground: '#75B7E5'
            },
            {
                name: 'Samsunspor',
                background: {
                    rectangleColours: ['#E3000F']
                }
            },
            {
                name: 'Giresunspor',
                background: {
                    rectangleColours: ['#00984A']
                }
            }
        ]
    }
]