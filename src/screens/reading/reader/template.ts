export default `
<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
      }

      #viewer {
        height: 100vh;
        padding: 0;
        margin: 0;
        width: 100vw;
        overflow: hidden !important;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
  </head>

  <body oncopy='return false' oncut='return false'>
    <div id="viewer"></div>
    <script>
      let book;
      let rendition;
      const type = window.type;
      const file = window.book;
      const theme = window.theme;
      const flow = window.flow;

   
      rendition = book.renderTo("viewer", flow);

      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "onStarted" }));

      book.ready
        .then(function () {
          book.locations.generate(1600).then(function () {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "onLocationsReady",
              epubKey: book.key(),
              locations: book.locations.save(),
            }));
          });
        })
        .then(function () {
          var displayed = rendition.display();

          displayed.then(function () {
            var currentLocation = rendition.currentLocation();

            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "onReady",
              totalLocations: book.locations.total,
              currentLocation: currentLocation,
              progress: book.locations.percentageFromCfi(currentLocation.start.cfi),
            }));
          });

        

          book.loaded.navigation.then(function (toc) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'onNavigationLoaded',
              toc: toc,
            }));
          });
        })
        .catch(function (err) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "onDisplayError",
          reason: reason
        }));
      });

      rendition.on('started', () => {
        rendition.themes.register({ theme: theme });
        rendition.themes.select('theme');
      });

      rendition.on("relocated", function (location) {
        var percent = book.locations.percentageFromCfi(location.start.cfi);
        var percentage = Math.floor(percent * 100);

        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "onLocationChange",
          currentLocation: location,
          progress: percentage,
        }));

        if (location.atStart) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "onBeginning",
          }));
        }

        if (location.atEnd) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "onFinish",
          }));
        }
      });

      rendition.on("rendered", function (section) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'onRendered',
          section: section,
          currentSection: book.navigation.get(section.href),
        }));
      });

      rendition.on("layout", function (layout) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'onLayout',
          layout: layout,
        }));
      });
			
    rendition.on("selected", function (cfiRange, contents) {
         book.getRange(cfiRange).then(function (range) {
         if (range) {
         window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'onSelected',
        cfiRange: cfiRange,
        text: range.toString(),
        htmlElement: contents.documentElement.innerHTML.toString(),
      }))
    }
  });
});
        rendition.on("markClicked", function (cfiRange, contents) {
          rendition.annotations.remove(cfiRange, "highlight");
          book.getRange(cfiRange).then(function (range) {
            if (range) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'onMarkPressed',
                cfiRange: cfiRange,
                text: range.toString(),
              }));
            }
          });
        });

        rendition.on("resized", function (layout) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'onResized',
            layout: layout,
          }));
        });
    </script>
  </body>
</html>
`
