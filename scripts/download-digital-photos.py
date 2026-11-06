"""One serial downloader for the complete, individually credited digital catalog.
Halts on429 and records Retry-After; never substitutes a different model.
"""
import ast,json,hashlib,urllib.parse,subprocess,time
from pathlib import Path
from PIL import Image,ImageOps
root=Path(__file__).resolve().parents[1]
def literals(file,name):
 values=[]
 for node in ast.parse((root/'scripts'/file).read_text()).body:
  if isinstance(node,ast.Assign) and any(isinstance(t,ast.Name) and t.id==name for t in node.targets):
   try:values=ast.literal_eval(node.value)
   except (ValueError,TypeError):pass
  if isinstance(node,ast.AugAssign) and isinstance(node.target,ast.Name) and node.target.id==name:values+=ast.literal_eval(node.value)
 return values
manifest=[]
for m,fn,a in literals('canon-photos.py','items'):
 cc0=m in ['r1','r6-mark-iii','r5-mark-ii','250d'];manifest.append(dict(batch='canon',id='canon-'+m,file=fn,author=a,license='CC0 1.0' if cc0 else 'CC BY-SA 4.0',licenseUrl='https://creativecommons.org/publicdomain/zero/1.0/' if cc0 else 'https://creativecommons.org/licenses/by-sa/4.0/'))
for m,fn,a,lic in literals('nikon-photos.py','items'):
 url='https://artlibre.org/licence/lal/en/' if lic=='Free Art License' else 'https://creativecommons.org/publicdomain/zero/1.0/' if lic=='CC0' else 'https://creativecommons.org/licenses/'+('by-sa/' if 'SA' in lic else 'by/')+lic.split()[-1]+'/'
 manifest.append(dict(batch='nikon',id='nikon-'+m,file=fn,author=a,license=lic,licenseUrl=url))
for r in json.loads((root/'scripts/sony-photo-manifest.json').read_text()):manifest.append(dict(r,batch='sony'))
for m,fn,a,l in literals('fujifilm-photos.py','rows'):
 manifest.append(dict(batch='fujifilm',id='fujifilm-'+m,file=fn,author=a,license='CC0 1.0' if l=='CC0' else 'CC BY-SA '+l,licenseUrl='https://creativecommons.org/publicdomain/zero/1.0/' if l=='CC0' else f'https://creativecommons.org/licenses/by-sa/{l}/'))
for r in json.loads((root/'scripts/other-photos.json').read_text()):manifest.append(dict(r,batch='other'))
(root/'scripts/digital-photo-download-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
cache=Path('/tmp/digital-download');cache.mkdir(exist_ok=True)
for r in manifest:
 p=root/'src/digital-batches'/(r['batch']+'.json');batch=json.loads(p.read_text());out=root/'public/cameras'/(r['id']+'.webp')
 if r['id'] in batch['photos'] and out.exists():continue
 fn=r['file'].replace(' ','_');h=hashlib.md5(fn.encode()).hexdigest();encoded=urllib.parse.quote(fn)
 url=f'https://upload.wikimedia.org/wikipedia/commons/thumb/{h[0]}/{h[:2]}/{encoded}/1280px-{encoded}'
 target=cache/(r['id']+'-'+h+'.jpg');headers=cache/(r['id']+'.headers')
 if not target.exists():
  result=subprocess.run(['curl','-fLsS','--max-time','45','--max-filesize','25000000','-D',str(headers),url,'-o',str(target)],capture_output=True,text=True)
  if result.returncode:
   raw=headers.read_text() if headers.exists() else '';print(r['id'],'FAILED',result.stderr[-200:],raw[-600:],flush=True)
   if '429' in raw:raise SystemExit(29)
   time.sleep(4);continue
 try:
  im=ImageOps.exif_transpose(Image.open(target)).convert('RGB');im.thumbnail((1280,1280));assert max(im.size)>=600
  im.save(out,'WEBP',quality=88)
  record={k:r[k] for k in ['author','license','licenseUrl']};record.update(src='/cameras/'+out.name,sourceUrl='https://commons.wikimedia.org/wiki/File:'+encoded,width=im.width,height=im.height,modifications='尺寸适配 / WebP')
  batch=json.loads(p.read_text());batch['photos'][r['id']]=record;p.write_text(json.dumps(batch,ensure_ascii=False,indent=2)+'\n');print(r['id'],'OK',im.size,flush=True)
 except Exception as e:print(r['id'],'invalid photograph',e,flush=True);target.unlink(missing_ok=True)
 time.sleep(4)
