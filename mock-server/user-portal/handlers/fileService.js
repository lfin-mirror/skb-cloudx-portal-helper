module.exports = function (app, getScenario) {
  app.post('/v1/fileService/uploads', (req, res) => {
    res.json({
      data: {
        pathKey: 'mock-path-001',
        fileName: 'uploaded-file.txt',
      },
      errCode: null,
      errMsg: null,
    });
  });

  app.get('/v1/fileService/files/:storFileId', (req, res) => {
    const buffer = Buffer.from('mock file content');
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename="mock-file-${req.params.storFileId}.txt"`);
    res.send(buffer);
  });
};
