import Util from '@services/util.js';
import Sentence from '@scripts/h5p-dictation-sentence.js';
import {expect, test} from '@jest/globals';

// containsRTLCharacters
const testCasesRTL = [
  {string: 'abc', result: false},
  {string: '', result: false},
  {string: undefined, result: false},
  {string: '汉堡包/漢堡包, 汉堡/漢堡', result: false},
  {string: 'עברית', result: true},
  {string: 'عبرانی_زبان', result: true},
  {string: 'Arabic: عَرَبِيّ', result: true}
];

for (let i = 0; i < testCasesRTL.length; i++) {
  test('Does "' + testCasesRTL[i].string + '" contain RTL characters?', () => {
    expect(Util.containsRTLCharacters(testCasesRTL[i].string)).toBe(testCasesRTL[i].result);
  });
}

// stripPunctuation
const testCasesStripPunctuation = [
  {string: '', result: ''},
  {string: 'John', result: 'John'},
  {string: 'John goes to school.', result: 'John goes to school'},
  {string: 'John goes to school. Do you?', result: 'John goes to school Do you'},
  {string: 'Users\' browser', result: 'Users\' browser'},
  {string: 'John\'s car broke.', result: 'John\'s car broke'},
  {string: '¿Qué?', result: 'Qué'},
  {string: '¿Qué? Hola!', result: 'Qué Hola'},
  {string: '¿Qué? Foo\'s Hola!', result: 'Qué Foo\'s Hola'},
  {string: 'a - b', result: 'a b'},
  {string: 'a- b', result: 'a b'},
  {string: 'a -b', result: 'a b'},
  {string: 'a - b – c — d', result: 'a b c d'}
];

for (let i = 0; i < testCasesStripPunctuation.length; i++) {
  test('Is ' + testCasesStripPunctuation[i].string + ' stripped to ' + testCasesStripPunctuation[i].result, () => {
    expect(Sentence.stripPunctuation(testCasesStripPunctuation[i].string)).toBe(testCasesStripPunctuation[i].result);
  });
}

// addSpaces
const testCasesAddSpaces = [
  {string: '', result: ''},
  {string: 'John', result: 'John'},
  {string: 'John goes to school.', result: 'John goes to school .'},
  {string: 'John goes to school. Do you?', result: 'John goes to school . Do you ?'},
  {string: 'Users\' browser', result: 'Users\' browser'},
  {string: 'John\'s car broke.', result: 'John\'s car broke .'},
  {string: '¿Qui?', result: '¿ Qui ?'},
  {string: '¿Qué?', result: '¿ Qué ?'},
  {string: '¿Qué? Hola!', result: '¿ Qué ? Hola !'},
  {string: '¿Qué? Foo\'s Hola!', result: '¿ Qué ? Foo\'s Hola !'}
];

for (let i = 0; i < testCasesAddSpaces.length; i++) {
  test('Is ' + testCasesAddSpaces[i].string + ' expanded to ' + testCasesAddSpaces[i].result, () => {
    expect(Sentence.addSpaces(testCasesAddSpaces[i].string)).toBe(testCasesAddSpaces[i].result);
  });
}

// replace fullwidth characters
const testCasesReplaceFullwidth = [
  {string: '　！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～', result: ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'},
];

test('Do all full width characters get replaced with their regular width counterparts?', () => {
  expect(Sentence.replaceFullwidthWithHalfwidth(testCasesReplaceFullwidth[0].string, { autosplit: true })).toBe(testCasesReplaceFullwidth[0].result);
});
