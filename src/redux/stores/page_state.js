const pageState = {
    data_page: null,
    offset_page: 5,
    settings_language: "en", // "en", "ua"
    settings_theme: "light", // "dark"
    setting_animationIsOpen: true,
    left_side_is_open: false,
    search_query : null,
    suggestions: [],
    sorting_params: [],
    view_mode: "table" // Enum ("table", "card_list", "card_deck", "hexagons")
};
export default pageState;