# Individual Journal article design

This styles the page opened after clicking a story on the Journal landing page. It uses native article title, excerpt, original publication date, featured image, author and body HTML. Content is not rewritten.

In Shopify's theme code editor, replace **sections/journal-article.liquid** with the local `theme/sections/journal-article.liquid`. If **templates/article.journal.json** is missing, add the local file at that path too. The blog post must use the **journal** theme template. No live theme files were updated automatically.

Preview a post, then open the **Journal article** section in the theme editor to control category/date/author/excerpt/featured-image visibility, reading width, text sizes, colors and navigation labels. The Back link uses the Journal Landing Page when available, otherwise the blog URL; it can be overridden in the section settings.

The design includes a centered title and excerpt, responsive featured image, a narrow reading column, inline images and captions, pull quotes, existing HTML paired-image/image-plus-text treatments, and previous/next article links. The existing theme supplies its own header and footer.

The featured image can also appear inside the imported RSS body. Disable **Show featured image** if that repetition is unwanted; the template does not remove images from editorial content. This design renders the native article body, then optional app-owned editorial blocks and related references. The Journal article section has separate toggles for those additions. The default app namespace matches this installation; update it if using a different Shopify app.

Liquid and template validation pass using Shopify's cached schemas. Check the actual theme on desktop and mobile before publishing: fonts and global theme styles can affect the final appearance.
