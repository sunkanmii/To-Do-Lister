self.onmessage(evt => {
    let question = evt.data.question;

    let answer = figureOutAnswer(question);

    self.postMessage(answer);
})