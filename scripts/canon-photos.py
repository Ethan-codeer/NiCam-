import pathlib,json,hashlib,urllib.request,urllib.parse,io,time
from PIL import Image,ImageOps
root=pathlib.Path('/workspace/nicam');p=root/'src/digital-batches/canon.json';data=json.loads(p.read_text())
items=[
('r6','Canon R6 und RF 85 2,0-8067.jpg','GodeNehler'),('r6-mark-ii','Canon EOS R6 Mark II 9 jan 2023b.jpg','昼落ち'),('r','Canon EOS R 07 sep 2018b.jpg','昼落ち'),('rp','Canon EOS RP 27 Mar 2019b.jpg','昼落ち'),('r100','Canon EOS R100 19 aug 2023b.jpg','昼落ち'),('r8','Canon EOS R8 27 may 2023b.jpg','昼落ち'),('r1','Canon EOS R1 12 apr 2025b.jpg','昼落ち'),('r3','Canon EOS R3.jpg','Harrison Jones'),('90d','Canon EOS 90D.jpg','Jean-Paul GALLOIS'),('2000d','Canon EOS 2000D.jpg','Chris Calvin'),('r7','Canon EOS R7+RF-S 18-150mm f3.5-6.3 IS STM.jpg','Dinkun Chen'),('r10','Canon EOS R10+RF-S 18-45mm f4.5-6.3 IS STM.jpg','Dinkun Chen'),('r50','Canon EOS R50+RF-S 55-210mm f5-7.1 IS STM.jpg','Dinkun Chen'),('r5-mark-ii','Canon EOS R5 Mark II (front, no body cap).jpg','D. Benjamin Miller'),('r6-mark-iii','Canon EOS R6 Mark III 26 nov 2025b.jpg','昼落ち'),('850d','Canon EOS 850D+EF-S 18-55mm f3.5-5.6 IS STM.jpg','Dinkun Chen'),('6d-mark-ii','Canon EOS 6D Mark II by EF50mm F1.2L USM.jpg','根川大橋 (Negawa Ohashi)'),('250d','Canon EOS 250D.jpg','Vera de Kok'),('5d-mark-iv','Canon EOS 5D Mark IV+EF 24-105mm f4L IS II USM.jpg','Dinkun Chen')]
for m,fn,author in items:
 id='canon-'+m;dest=root/'public/cameras'/f'{id}.webp';fn=fn.replace(' ','_');h=hashlib.md5(fn.encode()).hexdigest();url=f'https://upload.wikimedia.org/wikipedia/commons/{h[0]}/{h[:2]}/'+urllib.parse.quote(fn)
 try:
  if not dest.exists():
   req=urllib.request.Request(url,headers={'User-Agent':'NiCamCameraCatalogue/1.0'});b=urllib.request.urlopen(req,timeout=35).read();im=ImageOps.exif_transpose(Image.open(io.BytesIO(b))).convert('RGB');im.thumbnail((1200,1200));im.save(dest,'WEBP',quality=85)
  im=Image.open(dest);cc0=m in ['r1','r6-mark-iii','r5-mark-ii','250d'];data['photos'][id]=dict(src=f'/cameras/{id}.webp',author=author,license='CC0 1.0' if cc0 else 'CC BY-SA 4.0',licenseUrl='https://creativecommons.org/publicdomain/zero/1.0/' if cc0 else 'https://creativecommons.org/licenses/by-sa/4.0/',sourceUrl='https://commons.wikimedia.org/wiki/File:'+urllib.parse.quote(fn),width=im.width,height=im.height,modifications='尺寸适配 / WebP');p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n');print(id,'OK',flush=True)
 except Exception as e:
  print(id,str(e),flush=True)
  if getattr(e,'code',0)==429:break
 time.sleep(4)
