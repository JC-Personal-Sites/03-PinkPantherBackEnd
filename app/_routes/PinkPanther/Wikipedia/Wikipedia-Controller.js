const axios = require('axios');
const api = axios.create({ baseURL: process.env.WIKIPEDIA_API });
const ErrorResponse = require('../../../middleware/errorResponse');
const asyncHandler = require('../../../middleware/async');

exports.getAbout = asyncHandler(async (req, res, next) => {
  try {
    const data = await api.get('/page/summary/Pink_Panther_(character)').then((res) => res.data);
    const aboutData = {
      title: 'About Page - WikiPedia API',
      subTitle: data.description,
      contents: data.extract,
    };

    res.status(200).json({ data: aboutData });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});

exports.getHistory = asyncHandler(async (req, res, next) => {
  try {
    // By passing in the revission this will keep the response stable
    const data = await api.get('/page/talk/Pink_Panther_(character)/1196918442').then((res) => res.data);

    // ---- workings needed to delimite text string from Wikipedia ---- \\
    const content = { title: '', data: { columns: [], rows: [] } };
    const hData = data.topics[11];
    content.title = hData.html;
    content.data.columns = hData.replies[0].html.split('<br>').filter((n, i) => n && i < 6);

    const tempWorkings = hData.replies[0].html.split('<br>').filter((n, i) => n && i > 5);
    let start = 0;
    let end = 7;

    while (end < 27) {
      let chunk = tempWorkings.slice(start, end);
      start = end;
      end = start === 7 ? 14 : start + 6;
      if (chunk.length > 6) {
        chunk.splice(4, 1);
      }

      // refactor for global table rows
      const finalChunk = [];
      chunk.forEach((c, i) => {
        // Workings for links in data to work working when rendered
        finalChunk.push({
          type: `${i === 1 || i === 3 ? 'html' : 'string'}`,
          value:
            i === 1 || i === 3
              ? c.replace('./', 'https://en.wikipedia.org/wiki/').replace('">', '" target="_blank">')
              : c,
        });
      });

      content.data.rows.push(finalChunk);
    }

    const historyData = {
      title: 'History Page - WikiPedia API with destructure',
      content: content,
    };

    res.status(200).json({ data: historyData });
  } catch (err) {
    return next(new ErrorResponse(`Data not found`, 500));
  }
});
