class InlineChunkHtmlPlugin {
    constructor(private htmlWebpackPlugin: any, private tests: any) {
    }

    getInlinedTag(publicPath: any, assets: { [x: string]: any; }, tag: { tagName: string; attributes: { src: string; }; }) {
        if (tag.tagName !== 'script' || !(tag.attributes && tag.attributes.src)) {
            return tag;
        }
        const scriptName = publicPath
            ? tag.attributes.src.replace(publicPath, '')
            : tag.attributes.src;
        if (!this.tests.some((test: any) => scriptName.match(test))) {
            return tag;
        }
        const asset = assets[scriptName];
        if (asset == null) {
            return tag;
        }
        return { tagName: 'script', innerHTML: asset.source(), closeTag: true };
    }

    apply(compiler: { options: { output: { publicPath: string; }; }; hooks: { compilation: { tap: (arg0: string, arg1: (compilation: any) => void) => void; }; }; }) {
        let publicPath = compiler.options.output.publicPath || '';
        if (publicPath && !publicPath.endsWith('/')) {
            publicPath += '/';
        }

        compiler.hooks.compilation.tap('InlineChunkHtmlPlugin', (compilation: { assets: any; }) => {
            const tagFunction = (tag: any) =>
                this.getInlinedTag(publicPath, compilation.assets, tag);

            const hooks = this.htmlWebpackPlugin.getHooks(compilation);
            hooks.alterAssetTagGroups.tap('InlineChunkHtmlPlugin', (assets: { headTags: any[]; bodyTags: any[]; }) => {
                assets.headTags = assets.headTags.map(tagFunction);
                assets.bodyTags = assets.bodyTags.map(tagFunction);
            });

            // Still emit the runtime chunk for users who do not use our generated
            // index.html file.
            // hooks.afterEmit.tap('InlineChunkHtmlPlugin', () => {
            //   Object.keys(compilation.assets).forEach(assetName => {
            //     if (this.tests.some(test => assetName.match(test))) {
            //       delete compilation.assets[assetName];
            //     }
            //   });
            // });
        });
    }
}

module.exports = InlineChunkHtmlPlugin;