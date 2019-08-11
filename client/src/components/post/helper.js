import moment from 'moment';

export const fromNow = date => {
    return moment(date).fromNow();
}
export const getWordCount = editorState => {
    const plainText= editorState.getCurrentContent().getPlainText('');
    const regex = /(?:\r\n|\r|\n)/g;
    const cleanString = plainText.replace(regex,'').trim();

    const wordArray = cleanString.match(/\S+/g);

    return wordArray ? wordArray.length : 0;
}
export const getReadingTime = totalWords => {
    const wordsPerMin= 200;
    const mins = totalWords/wordsPerMin;
    const readTime = Math.ceil(mins);

    return readTime > 1 ? `${readTime} minutes read` : `${readTime} minute read`;
}