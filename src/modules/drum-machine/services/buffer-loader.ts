export default class BufferLoader {
  context: object;
  urlList: object;
  onload: (data: any) => void;
  bufferList: string[];
  loadCount: number;
  constructor(
    context: object,
    urlList: string[],
    callback: (data: any) => void
  ) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = [];
    this.loadCount = 0;
  }

  loadBuffer = (url: string, index: string) => {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function () {
      // Asynchronously decode the audio file data in request.response
      //@ts-ignore
      loader.context.decodeAudioData(
        request.response,
        function (buffer: any) {
          if (!buffer) {
            alert("error decoding file data: " + url);
            return;
          }
          //@ts-ignore
          loader.bufferList[index] = buffer;
          if (++loader.loadCount === Object.keys(loader.urlList).length)
            loader.onload(loader.bufferList);
        },
        function (error: any) {
          console.error("decodeAudioData error", error);
        }
      );
    };

    request.onerror = function () {
      alert("BufferLoader: XHR error");
    };

    request.send();
  };

  load = () => {
    Object.keys(this.urlList).forEach((letter) => {
      //@ts-ignore
      this.loadBuffer(this.urlList[letter], letter);
    });
  };
}
