export default function (selector: string | undefined, textToCopy: string | undefined) {
  const dummy = document.createElement('div');

  document.getElementById(`${selector}`).appendChild(dummy);
  dummy.setAttribute('id', 'textToCopy');
  document.getElementById('textToCopy').innerHTML = textToCopy;
  if (document.selection) {
    const range = document.body.createTextRange();

    range.moveToElementText(document.getElementById('textToCopy'));
    range.select().createTextRange();
    document.execCommand('Copy');
  } else if (window.getSelection) {
    window.getSelection().removeAllRanges();
    const range = document.createRange();

    range.selectNode(document.getElementById('textToCopy'));
    window.getSelection().addRange(range);
    document.execCommand('Copy');
  }

  document.getElementById(`${selector}`).removeChild(dummy);
}
