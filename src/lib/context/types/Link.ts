/**
 * Defining what a link should contain to ensure consistency and SEO friendly.
 *
 * `Anchor` is a TypeScript interface Being used to define ALL of the links
 * within the website. This is to ensure that all links are consistent and
 * follow the same structure. I referenced [`<a>`: The Anchor Element - developer.mozilla.org/HTML/Element/a](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
 * when creating this interface.
 *
 * @param {boolean}as       - Optionally specify the URL to be used for the link. @see [`<a>`: The Anchor Element - developer.mozilla.org/HTML/Element/a](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
 * @param {string}href   - The href of the link. @see [`href`: HTML Href Attribute - developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/href)
 * @param {boolean}hreflang - Optionally specify the language of the linked page. @see [`hreflang`: Next.js Link - nextjs.org](https://nextjs.org/docs/api-reference/next/link#hreflang)
 * @param {boolean}isExternal - Optionally specify if the link is external. @see [`isExternal`: Next.js Link - nextjs.org](https://nextjs.org/docs/api-reference/next/link#isexternal)
 * @param {boolean}legacyBehavior - Optionally specify the legacy behavior of the link. @see [`legacyBehavior`: Next.js Link - nextjs.org](https://nextjs.org/docs/api-reference/next/link#legacybehavior)
 * @param {boolean}passHref - Optionally pass the href to the child element. @see [`passHref`: Next.js Link - nextjs.org](https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag)
 * @param {boolean}prefetch - Optionally prefetch the linked page in the background. @see [`prefetch`: Next.js Link - nextjs.org](https://nextjs.org/docs/api-reference/next/link#prefetch)
 * @param {string}referrerpolicy - Optionally specify which referrer to send when fetching the resource. @see [`referrerpolicy`: HTML Referrer Policy Attribute - developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-referrerpolicy)
 * @param {string}rel    - The rel attribute defines the relationship between a linked resource and the current document. @see [`rel`: HTML Relation Attribute - developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel)
 * @param {boolean}replace  - Optionally replace the current URL in the history stack. @see [`replace`: Next.js Link - nextjs.org](https://nextjs.org/docs/api-reference/next/link#replace)
 * @param {boolean}scroll   - Optionally scroll to the top of the page when the link is clicked. @see [`scroll`: Next.js Link - nextjs.org](https://nextjs.org/docs/api-reference/next/link#scroll)
 * @param {boolean}shallow  - Optionally only update the URL without running getStaticProps/getServerSideProps. @see [`shallow`: Next.js Link - nextjs.org](https://nextjs.org/docs/api-reference/next/link#shallow)
 * @param {string}target - Where to display the linked URL. @see [`target`: HTML Target Attribute - developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
 * @param {string}type   - Optionally specify the targets MIME type. No built-in functionality, just labeling. @see [`type`: HTML Type Attribute - developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-type
 *
 * @version    0.0.2
 * @since      2023-08-19
 * @changeLog 2023-08-19 | Erik Plachta | Extracted file from the first version of my website.
 */
export default interface LinkConfig {
	// as? : String;
  href:
    | String
    | `#`
    | `https://`
    | `http://`
    | `mailto:`
    | `tel:`
    | `sms:`
    | `ftp://`
    | `file://`;
  name: String;
  rel:
    | String
    | "noopener"
    | "noreferrer"
    | "nofollow"
    | "ugc"
    | "sponsored"
    | "alternate"
    | "author"
    | "help"
    | "license"
    | "next"
    | "prev"
    | "search"
    | "tag";
  target:
    | React.HTMLAttributeAnchorTarget
    | "_self"
    | "_blank"
    | "_parent"
    | "_top";
  hreflang?:
    | any
    | "en"
    | "es"
    | "fr"
    | "de"
    | "it"
    | "ja"
    | "ko"
    | "pt"
    | "ru"
    | "zh"
    | "zh-Hans"
    | "zh-Hant";
  isExternal?: any | 0 | 1;
  legacyBehavior?: any | 0 | 1;
  passHref?: any | 0 | 1;
  prefetch?: any | 0 | 1;
  referrerpolicy?:
    | String
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  replace?: any | 0 | 1;
  scroll?: any | 0 | 1;
  shallow?: any | 0 | 1;
  type?:
    | String
    | "href"
    | "text"
    | "application"
    | "audio"
    | "image"
    | "image/png"
    | "image/svg"
    | "video"
    | "video/mp4"
    | "video/webm"
    | "video/ogg";
}
