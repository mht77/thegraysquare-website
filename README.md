# The Gray Square website

Site for [The Gray Square](https://apps.apple.com/app/the-gray-square/id6810801351), built by GitHub
Pages (Jekyll) from `main` and served at **https://thegraysquare.com** (`CNAME`).

| Page | Template | Content |
|---|---|---|
| Game | `index.html` | `_data/home.yml` |
| Support | `support/index.html` | `_data/support.yml` |
| Privacy policy | `privacy/index.html` | `_data/privacy.yml` |
| 404 | `404.html` | `_data/not_found.yml` |
| Header, footer, store buttons | `_layouts/default.html`, `_includes/` | `_data/site.yml` |

All copy and images live in `_data/*.yml`, which [Pages CMS](https://pagescms.org) edits through
`.pages.yml`. Any field left empty, or a whole file deleted, falls back to the same field in
`_data/defaults/`, which the CMS does not touch. Long text fields are Markdown. The playable demo board,
the animations and the decorative graphics stay in the templates and `js/site.js`.

The privacy policy and the game copy are kept in step with `StoreListing/privacy-policy.md` and
`StoreListing/support.md` in the game repo. Colours, radii and type follow
`Assets/Scripts/Utils/DesignSystem.cs`; headlines and the hero follow `StoreListing/store_art.py`, and
`img/store/` is the published App Store art. Copy uses no em or en dashes.

Preview locally with the same Jekyll GitHub uses (`Gemfile` with `gem "github-pages"`):

```bash
bundle exec jekyll serve
```
