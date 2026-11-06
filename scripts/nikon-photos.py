import pathlib,hashlib,urllib.parse,subprocess,json,time
from PIL import Image,ImageOps
root=pathlib.Path('/workspace/nicam');p=root/'src/digital-batches/nikon.json'
items=[('z7ii','Nikon Z7ii.jpg','Wilfredor','CC0'),('z6ii','Nikon Z 6II 2.jpg','Thilo Parg / Wikimedia Commons','CC BY-SA 4.0'),('z9','Nikon Z 9 11 jun 2022c.jpg','昼落ち','CC BY-SA 4.0'),('z7','Nikon Z7.jpg','Phiarc','CC BY-SA 4.0'),('z6','Nikon Z6 Front with Z-Mount and Sensor.jpg','Phiarc','CC BY-SA 4.0'),('z5','Nikon Z 5 w Nikkor 50mm f1.8S.jpg',"Alex 'Florstein' Fedorov",'CC BY-SA 4.0'),('z50','Nikon Z 50 0.jpg','Thilo Parg / Wikimedia Commons','CC BY-SA 4.0'),('z30','Nikon Z30.jpg','Phiarc','CC BY-SA 4.0'),('zfc','Nikon Zfc with len.jpg','Peachyeung316','CC BY-SA 4.0'),('d810','Nikon D810.jpg','emperornie','CC BY-SA 2.0'),('d800','Nikon D800, front-side view.jpg','Dave Dugdale','CC BY-SA 2.0'),('d780','Nikon D780 body.jpg','Henry Söderlund','CC BY 2.0'),('d750','Nikon d750 cap on.jpg','Jakub T. Jankiewicz','CC BY-SA 4.0'),('d610','Nikon D610.jpg','Jeffrey M Dean','CC BY-SA 3.0'),('d500','Nikon D500 front 2016 Nikon Museum.jpg','Morio','CC BY-SA 4.0'),('d7500','Nikon D7500.JPG','Jj98 (John T. Harpster)','CC BY-SA 4.0')]
items += [('d850','Nikon D850.jpg','Wladyslaw Sojka (www.sojka.photo)','Free Art License'),('d7200','Nikon D7200 01-2016 img1 body front.jpg','A.Savin, Wikipedia','Free Art License')]
# Only files whose exact model, author and license were read on Commons are listed.
for key,name,author,lic in items:
 if ('nikon-'+key) in json.loads(p.read_text())['photos']:continue
 id='nikon-'+key;dest=root/'public/cameras'/f'{id}.webp';raw=pathlib.Path('/tmp')/(id+'.jpg');fn=name.replace(' ','_');md=hashlib.md5(fn.encode()).hexdigest();url=f'https://upload.wikimedia.org/wikipedia/commons/{md[0]}/{md[:2]}/'+urllib.parse.quote(fn)
 if not raw.exists():
  r=subprocess.run(['curl','--fail','-L','--max-time','30','-sS',url,'-o',str(raw)])
  if r.returncode:
   print(key,'download failed; stop this run to respect rate limits',flush=True);break
 try:
  im=ImageOps.exif_transpose(Image.open(raw)).convert('RGB');im.thumbnail((1200,1200));im.save(dest,'WEBP',quality=88)
 except Exception as e:print(key,str(e),flush=True);continue
 d=json.loads(p.read_text());licenseUrl='https://creativecommons.org/publicdomain/zero/1.0/' if lic=='CC0' else 'https://creativecommons.org/licenses/'+('by-sa/' if 'SA' in lic else 'by/')+lic.split()[-1]+'/'
 if lic=='Free Art License':licenseUrl='https://artlibre.org/licence/lal/en/'
 d['photos'][id]=dict(src='/cameras/'+id+'.webp',author=author,license=lic,licenseUrl=licenseUrl,sourceUrl='https://commons.wikimedia.org/wiki/File:'+urllib.parse.quote(fn),width=im.width,height=im.height,modifications='尺寸适配 / WebP')
 p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n');print(key,'OK',im.size,flush=True);time.sleep(4)
