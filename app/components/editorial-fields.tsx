import { useState } from "react";
import { Form, useNavigation } from "@remix-run/react";
import { LAYOUTS } from "../lib/editorial-values.js";
type Block=Record<string,string>;
export type Choice={id:string;title:string};
export type EditorialData={blocks:Block[];products:string[];stories:string[];digests:Record<string,string|null>};
export default function EditorialFields({editorial,choices}: {editorial:EditorialData;choices:{products:Choice[];stories:Choice[]}}){
 const [blocks,setBlocks]=useState(editorial.blocks);
 const [products,setProducts]=useState(editorial.products);
 const [stories,setStories]=useState(editorial.stories);
 const busy=useNavigation().state!=="idle";
 const change=(index:number,key:string,value:string)=>setBlocks(blocks.map((block,i)=>i===index?{...block,[key]:value}:block));
 function move(index:number,offset:number){const next=[...blocks];[next[index],next[index+offset]]=[next[index+offset],next[index]];setBlocks(next);}
 return <details className="feed-settings"><summary>Structured editorial content</summary><Form method="post" className="settings-form" style={{maxWidth:"100%"}}>
 <input type="hidden" name="intent" value="editorial"/><input type="hidden" name="editorial" value={JSON.stringify({blocks,products,stories})}/><input type="hidden" name="digests" value={JSON.stringify(editorial.digests)}/>
 <p className="settings-help">Add and reorder extra content below the article body. RSS sync preserves these changes.</p>
 {blocks.map((block,index)=><fieldset key={index}><legend>Block {index+1}</legend>
 <label>Layout<select value={block.layout} onChange={e=>change(index,"layout",e.target.value)}>{LAYOUTS.map(layout=><option key={layout} value={layout}>{layout.replaceAll("_"," ")}</option>)}</select></label>
 <label>Label<input value={block.label || ""} maxLength={100} onChange={e=>change(index,"label",e.target.value)}/></label>
 {["text","image_text","pull_quote"].includes(block.layout) && <label>Text or quote<textarea rows={4} value={block.text || ""} onChange={e=>change(index,"text",e.target.value)}/></label>}
 {["image","wide_image","two_images","image_text"].includes(block.layout) && <><label>Image URL<input type="url" value={block.image_url || ""} onChange={e=>change(index,"image_url",e.target.value)} placeholder="https://..."/></label><label>Image description<input value={block.alt || ""} maxLength={255} onChange={e=>change(index,"alt",e.target.value)}/></label><label>Caption<textarea rows={2} value={block.caption || ""} onChange={e=>change(index,"caption",e.target.value)}/></label></>}
 {block.layout==="two_images" && <><label>Second image URL<input type="url" value={block.second_image_url || ""} onChange={e=>change(index,"second_image_url",e.target.value)}/></label><label>Second image description<input value={block.second_alt || ""} maxLength={255} onChange={e=>change(index,"second_alt",e.target.value)}/></label><label>Second caption<textarea rows={2} value={block.second_caption || ""} onChange={e=>change(index,"second_caption",e.target.value)}/></label></>}
 <div className="treatment-toolbar"><button type="button" className="secondary-button" disabled={index===0} onClick={()=>move(index,-1)}>Move up</button><button type="button" className="secondary-button" disabled={index===blocks.length-1} onClick={()=>move(index,1)}>Move down</button><button type="button" className="secondary-button" onClick={()=>setBlocks(blocks.filter((_,i)=>i!==index))}>Remove</button></div></fieldset>)}
 <button type="button" className="secondary-button" disabled={blocks.length>=50} onClick={()=>setBlocks([...blocks,{layout:"text",label:"Block "+(blocks.length+1)}])}>Add editorial block</button>
 <label>Related products<select multiple value={products} size={5} onChange={e=>setProducts(Array.from(e.target.selectedOptions,option=>option.value))}>{products.filter(id=>!choices.products.some(choice=>choice.id===id)).map(id=><option key={id} value={id}>{id}</option>)}{choices.products.map(product=><option key={product.id} value={product.id}>{product.title}</option>)}</select></label>
 <label>Related Journal stories<select multiple value={stories} size={5} onChange={e=>setStories(Array.from(e.target.selectedOptions,option=>option.value))}>{stories.filter(id=>!choices.stories.some(choice=>choice.id===id)).map(id=><option key={id} value={id}>{id}</option>)}{choices.stories.map(story=><option key={story.id} value={story.id}>{story.title}</option>)}</select></label>
 <p className="settings-help">Hold Ctrl (Windows) or Command (Mac) to select multiple items. Choices show the first 50 products and 100 articles; saved references outside that list are retained.</p>
 <button className="primary-button" disabled={busy}>{busy?"Saving...":"Save editorial content"}</button></Form></details>;
}
