import hashlib,json,subprocess,pathlib,urllib.parse,time
from PIL import Image
rows=[('x100v','Fujifilm X100V 9 feb 2020a.jpg','昼落ち / My7thsecret','4.0'),('x100f','Fujifilm X100F.jpg','Ishootyoudotcom / My7thsecret','4.0'),('x100t','Fuji X100T.jpg','Herbythyme','4.0'),('x100s','2013 Fujifilm X100S 2013 CP+.jpg','Morio','3.0'),('x100','Digital camera Fuji X100.jpg','Kateer','3.0'),('x-t5','Fujifilm X-T5 4 nov 2022a.jpg','昼落ち','4.0'),('x-t4','Fujifilm X-T4 29 apr 2020a.jpg','昼落ち','4.0'),('x-t3','2019 02 Fuji X-T3 plan view front.jpg','Takeaway','4.0'),('x-t2','Fujifilm X-T2 20160716a.jpg','Focus35mm','4.0'),('x-t1','Fujifilm X-T1 with 18-55mm lens 20140405.jpg','Jerry Lai','2.0'),('x-t30','Fujifilm X-T30 27 Mar 2019a.jpg','昼落ち','4.0'),('x-t20','Fujifilm X-T20 20170226.jpg','Focus35mm','4.0'),('x-t10','Fujifilm X-T10 20160417.jpg','Focus35mm','4.0'),('x-pro3','Fujifilm X-Pro3 26 oct 2019a.jpg','昼落ち','4.0'),('x-pro2','Fujifilm X-Pro2 20160403.jpg','Focus35mm','4.0'),('x-pro1','130128 Fujifilm X-Pro1 001.jpg','Nienetwiler','3.0'),('x-h2','Fujifilm X-H2 22 nov 2022a.jpg','昼落ち','4.0'),('x-h2s','Fujifilm-X-H2S.jpg','Aps1729','CC0'),('x-h1','Fujifilm X-H1 17 feb 2018c.jpg','昼落ち','4.0')]
photos={}
for m,n,a,l in rows:
 fn=n.replace(' ','_');h=hashlib.md5(fn.encode()).hexdigest();u=f'https://upload.wikimedia.org/wikipedia/commons/{h[0]}/{h[:2]}/'+urllib.parse.quote(fn)
 p=pathlib.Path('/tmp/fuji-photo-'+m+'.jpg');out=pathlib.Path('public/cameras/fujifilm-'+m+'.webp')
 if not p.exists():
  r=subprocess.run(['curl','-fLsS','--max-time','45','-D','/tmp/fuji-photo-headers.txt',u,'-o',str(p)])
  if r.returncode:
   print('FAILED',m,'Stopping to respect rate limit',flush=True);break
  time.sleep(4)
 try:
  im=Image.open(p);im.thumbnail((1200,1200));im.save(out,'WEBP',quality=87)
  photos['fujifilm-'+m]={'src':'/cameras/'+out.name,'author':a,'license':'CC0 1.0' if l=='CC0' else 'CC BY-SA '+l,'licenseUrl':'https://creativecommons.org/publicdomain/zero/1.0/' if l=='CC0' else f'https://creativecommons.org/licenses/by-sa/{l}/','sourceUrl':'https://commons.wikimedia.org/wiki/File:'+urllib.parse.quote(fn),'width':im.width,'height':im.height,'modifications':'尺寸适配 / WebP','originalFile':n}
  print(m,im.size,flush=True)
 except Exception as e:print(m,e)
 pathlib.Path('/tmp/fuji-photos.json').write_text(json.dumps(photos,ensure_ascii=False,indent=2))
