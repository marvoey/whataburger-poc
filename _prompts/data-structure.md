# Whataburger Menu Data Structure

## Root Level (`public/html/`)

### `categories.json`
A flat array of all menu categories. Each entry contains:
- `category` — slug identifier (e.g. `"burgers"`, `"drinks-shakes"`)
- `items` — array of items in that category, each with:
  - `name` — display name (e.g. `"Whataburger®"`)
  - `url` — original Whataburger site path for that item's customization page (e.g. `/locations/447/menu/categories/burgers-1/recipes/whataburger-9/customization/1`)

Covers 13 categories total: `breakfast-11pm-11am`, `burgers`, `chicken`, `desserts-snacks`, `drinks-shakes`, `fish`, `group-ordering`, `jr-meals`, `kids`, `limited-all-time-favorites`, `salads`, `sides`, `three-big-deals`.

### `categories-full.json`
Same structure as `categories.json` but each item is enriched with its `customizationGroups` array inline — the same data found in individual `customization-groups.json` files. This is the fully denormalized, all-in-one data source (~359KB) containing every category, item, and customization option in a single file.

## Hierarchy (`categories/` → `{category}/` → `{item}/`)

```
categories/
  sides/                     ← category
    index.html               ← category page (scraped)
    screenshot.png           ← visual reference
    french-fries/            ← item
      index.html             ← item detail page (scraped)
      screenshot.png         ← visual reference
      customization-groups.json ← structured item data
    large-french-fries/
    onion-rings/
    ...
  drinks-shakes/
  kids/
  fish/
  ...
```

## Per Item JSON (`customization-groups.json`)

Each item's JSON contains:

- `category` + `item` identifiers
- `customizationGroups` array with groups like "French Fries", "Dipping Sauces", etc.
- Each group has a `type` (`radio` or `checkbox`) and `options` with name, displayName, and pricing/calorie info

## Goal

Use these scraped HTML pages, screenshots, and structured JSON files as the data source to build a dynamic Whataburger menu site (Astro).
