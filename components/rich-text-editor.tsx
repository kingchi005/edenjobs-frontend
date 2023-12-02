"use client";

import React from "react";
import RTEditor from "react-froala-wysiwyg";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

type TProps = {
  setRichTextValue:(v:string)=>void

}

export default function Richtexteditor({setRichTextValue}:TProps) {
	return (
		<div style={{}}>
			<RTEditor
				config={{
					placeholderText: " Add your content",

					// charCounterCount: false,
				}}
				onModelChange={setRichTextValue} 
			/>
		</div>
	);
}
