declare module 'inline-chunk-html-plugin' {
    export class InlineChunkHtmlPlugin {
        private htmlWebpackPlugin;
        private tests;
        constructor(htmlWebpackPlugin: any, tests: any);
        getInlinedTag(publicPath: any, assets: {
            [x: string]: any;
        }, tag: {
            tagName: string;
            attributes: {
                src: string;
            };
        }): {
            tagName: string;
            attributes: {
                src: string;
            };
        } | {
            tagName: string;
            innerHTML: any;
            closeTag: boolean;
        };
        apply(compiler: {
            options: {
                output: {
                    publicPath: string;
                };
            };
            hooks: {
                compilation: {
                    tap: (arg0: string, arg1: (compilation: any) => void) => void;
                };
            };
        }): void;
    }
}
