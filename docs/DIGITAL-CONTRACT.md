# 数码相机详细数据接口

正式源记录位于src/cameras/<id>.json，每个文件为下述CameraRecord。photos统一在src/photos.json。npm脚本自动由逐款源文件生成聚合数据和下述批次文件；批次仅供检查，不直接编辑。

每批 JSON: {cameras: CameraRecord[], photos: Record<id,Photo>}
CameraRecord: {id,name,brand,year:number|null,format,type,megapixels:number|null,width:number|null,height:number|null,depth:number|null,description,sourceUrl,verification:'verified'|'pending',digital:true,specGroups: [{id,title,rows:[{label,value,sourceUrl,condition?:string}]}]}
Photo:{src:'/cameras/<id>.webp',author,license,licenseUrl,sourceUrl,width,height,note?:string,modifications:'尺寸适配 / WebP'}

禁止猜测规格、照片错配、或将套机当不同机型计数。每款从厂家规格/说明书提取技术事实，优先官方。目标每款≥30有实质内容的参数行，覆盖≥7分组；完整可获得就写，缺少资料不可用堆砌'未知'凑行数。包含主要性能、镜头/对焦、显示/取景、快门/闪光、曝光/测光、拍摄/视频、防抖、存储/接口、电池/机身，排除保修、附件、报价。
不复制ZOL数据库。可用页面信息量作为布局标准。事实用中文简洁转述，保留单位、最高性能条件。官方页面每款实际读取后才能标verified，无法确认的年份/尺寸留null。完整行可英文专有名词辅助。
照片必须确切机型真实实物照+明确许可，Commons via web工具可读，上传域名curl可下载。wiki direct shell403 but tools.mcp__codex_apps__search_service_web_run works! 可用ALL_TOOLS发现描述。下载curl --fail -L --max-time30需exec require_escalated网络。Pillow已安装，可转换1200px WebP，别扩大低清原图。每张署名许可证真实记录，照片不得生成或拿近似型号替代。局部缺图报告，不删机型凑数。各agent仅拥有自己的src/digital-batches/<batch>.json和自己的public/cameras/<id>.webp，避免覆盖其他代理文件。
原有7图可复用src/photos.json (nikon-z8 nikon-zf canon-r5 sony-a7iv fujifilm-x100vi leica-q3 hasselblad-x2d)。其他机型必须新获取。
