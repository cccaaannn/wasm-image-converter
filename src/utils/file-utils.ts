const splitExtension = (fileName: string): { name: string, extension: string } => {
    if (!fileName) {
        return { name: "", extension: "" };
    };
    const splitArr = fileName.split('.');

    return {
        name: splitArr[0] ?? "",
        extension: splitArr[1] ?? ""
    };
}

const download = (file: File) => {
    const url = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.style.display = 'none';
    a.click();
    a.remove();
}

const FileUtils = {
    splitExtension,
    download
}

export default FileUtils;
