import { getExtension } from '../../../components/Utils/FileExtentionUtil';
import '@testing-library/jest-dom/extend-expect';

test("test for pdf File Icons extensions", () => {
    expect(getExtension("a.pdf")).toBe("file-pdf");
});

test("test for doc File Icons extensions", () => {
    expect(getExtension("a.doc")).toBe("file-word");
});

test("test for docx File Icons extensions", () => {
    expect(getExtension("a.docx")).toBe("file-word");
});

test("test for xls File Icons extensions", () => {
    expect(getExtension("a.xls")).toBe("file-excel");
});

test("test for xlsx File Icons extensions", () => {
    expect(getExtension("a.xlsx")).toBe("file-excel");
});

test("test for txt File Icons extensions", () => {
    expect(getExtension("a.txt")).toBe("file-text");
});

test("test for random File Icons extensions", () => {
    expect(getExtension("a.ppt")).toBe("file");
});