# The Gray Square — website

Static site for [The Gray Square](https://apps.apple.com/app/the-gray-square/id6810801351), served by
GitHub Pages from `main` at **https://thegraysquare.com** (`CNAME`).

| Page | Path |
|---|---|
| Game | `/` |
| Support | `/support/` |
| Privacy policy | `/privacy/` |

The privacy policy and the game copy are kept in step with `StoreListing/privacy-policy.md` and
`StoreListing/support.md` in the game repo; change those first, then mirror them here. Colours, radii
and type follow `Assets/Scripts/Utils/DesignSystem.cs`; headlines and the hero follow
`StoreListing/store_art.py`, and `img/store/` is the published App Store art.

Preview locally from this directory:

```bash
python3 -m http.server 8000
```
