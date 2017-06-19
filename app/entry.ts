type Types = 'tag-open' | 'tag-close' | 'text';

type Chunk = {
  type: Types;
  content: string;
}

type Payload = {
  texts: number[];
  chunks: Chunk[];
}

export function parseHTML(html:string): Payload {
  const chunks:Chunk[] = [];
  const arr = html.split('');
  const res:Payload = { texts: [], chunks };
  
  let buffer = '';
  let type = getType(arr, 0);

  for(let i = 0; i < arr.length; i++) {
    if(type == 'tag-open' || type == 'tag-close') {
      buffer += arr[i];

      if(arr[i] == '>') {
        chunks.push({ type, content: buffer });
        type = getType(arr, i + 1);
        buffer = '';
      }
    } else {
      if(arr[i] == '<') {
        res.texts.push(chunks.push({ type, content: buffer }) - 1);
        type = getType(arr, i);
        buffer = '';
        i -= 1;
      } else {
        buffer += arr[i];
      }
    }
  }

  chunks.push({ type, content: buffer });
  if(type == 'text') res.texts.push(chunks.length - 1);

  return res;
}

export function replaceText(p:Payload, i:number, text:string) {
  const ch = getTextChunk(p, i);
  ch.content = text;
}

export function getText(p:Payload, i:number) {
  return getTextChunk(p, i).content;
}

export function compile(p:Payload) {
  return p.chunks.map(c => c.content).join('');
}

function getType(arr:string[], i:number): Types {
  if(arr[i] == '<') {
    if (arr[i + 1] == '/') return 'tag-close';
    else return 'tag-open';
  }

  return 'text';
}

function getTextChunk(p:Payload, i:number) {
  if (i < 0) i = p.texts.length + i;
  i = p.texts[i];

  return p.chunks[i];
}