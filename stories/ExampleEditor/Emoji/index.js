import createEmojiPlugin from 'draft-js-emoji-plugin';

export const emojiPlugin = createEmojiPlugin();
export const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
