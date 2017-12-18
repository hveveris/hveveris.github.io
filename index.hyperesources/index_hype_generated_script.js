//	HYPE.documents["index"]

(function(){(function k(){function l(a,b,d){var c=!1;null==window[a]&&(null==window[b]?(window[b]=[],window[b].push(k),a=document.getElementsByTagName("head")[0],b=document.createElement("script"),c=h,false==!0&&(c=""),b.type="text/javascript",b.src=c+"/"+d,a.appendChild(b)):window[b].push(k),c=!0);return c}var h="index.hyperesources",c="index",e="index_hype_container";if(false==!1)try{for(var f=document.getElementsByTagName("script"),
a=0;a<f.length;a++){var b=f[a].src,d=null!=b?b.indexOf("/index_hype_generated_script.js"):-1;if(-1!=d){h=b.substr(0,d);break}}}catch(n){}if(false==!1&&(a=navigator.userAgent.match(/MSIE (\d+\.\d+)/),a=parseFloat(a&&a[1])||null,a=l("HYPE_584","HYPE_dtl_584",!0==(null!=a&&10>a||false==!0)?"HYPE-584.full.min.js":"HYPE-584.thin.min.js"),false==!0&&(a=a||l("HYPE_w_584","HYPE_wdtl_584","HYPE-584.waypoints.min.js")),a))return;f=window.HYPE.documents;
if(null!=f[c]){b=1;a=c;do c=""+a+"-"+b++;while(null!=f[c]);d=document.getElementsByTagName("div");b=!1;for(a=0;a<d.length;a++)if(d[a].id==e&&null==d[a].getAttribute("HYP_dn")){var b=1,g=e;do e=""+g+"-"+b++;while(null!=document.getElementById(e));d[a].id=e;b=!0;break}if(!1==b)return}b=[];b=[{name:"onSceneLoad",source:"function(hypeDocument, element, event) {\t\n\tvar cone = hypeDocument.getElementById('cone');\n\tvar tree = hypeDocument.getElementById('tree');\n\tvar cream = hypeDocument.getElementById('cream');\n\tvar sprinkles = hypeDocument.getElementById('sprinkles');\n\tvar choco = hypeDocument.getElementById('choco');\n\tvar knife = hypeDocument.getElementById('knife');\n\tvar dough = hypeDocument.getElementById('dough');\n\tvar gingerboard = hypeDocument.getElementById('gingerboard');\n\tvar canvasWrapper = hypeDocument.getElementById('canvasWrapper');\n\tvar man = hypeDocument.getElementById('man');\n\tvar moose = hypeDocument.getElementById('moose');\n\tvar heart = hypeDocument.getElementById('heart');\n\tvar bake = hypeDocument.getElementById('bake');\n\tvar slider = hypeDocument.getElementById('slider');\n\t\n\tvar buttons = [sprinkles, choco, cream, knife, dough, man, moose, heart];\n\tvar props = [bake, slider]\n\tvar rollOverElements = buttons.concat(props);\n\t\n\tvar activeCursor = null;\n\t\n\tvar language = \"en\";\n\n\t\n\tvar tools = {\n\t\tdough: {\n\t\t\tthickness: 60,\n\t\t\tdrawingFX: drawDough,\n\t\t\tcursor: \"brushCursor\"\n\t\t},\n\t\tsprinkles: {\n\t\t\tthickness: 30,\n\t\t\tdrawingFX: drawSprinkles,\n\t\t\tcursor: \"sprinklesCursor\"\n\t\t},\n\t\tknife: {\n\t\t\tthickness: 60,\n\t\t\tdrawingFX: erase,\n\t\t\tcursor: \"brushCursor\"\n\t\t},\n\t\tcream: {\n\t\t\tthickness: 5,\n\t\t\tdrawingFX: drawCream,\n\t\t\tcursor: \"creamCursor\"\n\t\t},\n\t\tchoco: {\n\t\t\tthickness: 20,\n\t\t\tdrawingFX: drawChocolate,\n\t\t\tcursor: \"brushCursor\"\n\t\t},\n\t\tman: {\n\t\t\tthickness: 1,\n\t\t\tdrawingFX: null,\n\t\t\tcursor: \"manCursor\"\n\t\t},\n\t\tmoose: {\n\t\t\tthickness: 1,\n\t\t\tdrawingFX: null,\n\t\t\tcursor: \"mooseCursor\"\n\t\t},\n\t\theart: {\n\t\t\tthickness: 1,\n\t\t\tdrawingFX: null,\n\t\t\tcursor: \"heartCursor\"\n\t\t}\n\t};\n\t\n\tvar stage;\n\tvar isDrawing;\n\t\n\tvar doughCanvas;\n\tvar otherCanvas;\n\tvar doughImage;\n\tvar creamImage;\n\tvar chocoImage;\n\tvar sprinklesImage;\n\n\tvar manImage;\n\tvar heartImage;\n\tvar mooseImage;\n\n\tvar sprinkleCounter = 0;\n\n\tvar bitmap;\n\tvar doughMask;\n\t\t\t\n\tvar midPt;\n\tvar oldPt;\n\tvar oldMidPt;\n\t\n\tvar cursor;\n\tvar activeCursor;\n\t\n\tvar blur;\n\tvar lineThickness;\n\tvar activeTool = null;\n\t\n\tvar queue;\n\t\n\t\n\t$(function() {\n    \t$('#cone').draggable({ axis: \"x\", containment:\"#tree\", scroll:false, drag:updateThickness });\n    \t$('#tree').click(onTreeClick);\n    \t\n    \t$.each(rollOverElements, function(index, value) {\n\t\t\tvar txt = $(\"#\" + value.id + \"_\" + language);\n\t\t\ttxt.hide();\n\t\t});\t\n\t\t$(\"#texts_\" + language).show();\n\t\t$.each(props, function(index, value){\n\t\t\t$(value).mouseover(function() {\t\t\n\t\t\t\tsetHoverHint(this);\n\t\t\t});\n\t\t\t$(value).mouseout(function(){\n\t\t\t\tsetHoverHint(null);\n\t\t\t});\n\t\t});\n\n\n    \tpreloadAssets();\n    \t\n    \t$(cone).css({ left: $(tree).width()/2 });\n  \t});\n  \t\n  \t\n  \tfunction onTreeClick(e) {\n  \t\tvar myCone = $(cone);\n  \t\tvar myTree = $(tree);\n  \t\tvar halfCone = myCone.width()/2;\n  \t\t\n  \t\tvar coneX = e.offsetX - halfCone;\n  \t\tif (coneX < halfCone) {\n  \t\t\tconeX = halfCone;\n  \t\t} else if (coneX > myTree.width() - myCone.width()) {\n  \t\t\tconeX = myTree.width() - myCone.width();\n  \t\t}\n  \t\t\n  \t\tmyCone.css({ left: coneX });\n  \t\t\n  \t\tupdateThickness();\n  \t}\n  \t\n  \t\t\n\tfunction updateThickness() {\n\t\tlineThickness = parseInt(cone.style.left)/(parseInt(tree.style.width) - parseInt(cone.style.width));\n\t\tlineThickness = (lineThickness + 0.1) * activeThickness;\n\t}\n\t\n\t\n\tfunction preloadAssets() {\n\t\n\t\tvar manifest = [\n\t\t\t{ src: \"doughPattern3.jpg\", id: \"doughPattern\" },\n\t\t\t{ src: \"creamPattern.jpg\", id: \"creamPattern\" },\n\t\t\t{ src: \"chocoPattern2.jpg\", id: \"chocoPattern\" },\n\t\t\t{ src: \"sprinklesPattern3.jpg\", id: \"sprinklesPattern\" },\n\t\t\t\n\t\t\t{ src: \"Right_2_Man.png\", id: \"manImage\" },\n\t\t\t{ src: \"Right_4_Moose.png\", id: \"mooseImage\" },\n\t\t\t{ src: \"Right_3_Heart.png\", id: \"heartImage\" },\n\t\t\t\n\t\t\t{ src: \"sprinkles1.png\", id: \"sprinkles1\" },\n\t\t\t{ src: \"sprinkles2.png\", id: \"sprinkles2\" },\n\t\t\t{ src: \"sprinkles3.png\", id: \"sprinkles3\" },\n\t\n\t\t\t{ src: \"Mouse-Pointers_Brush.png\", id: \"brushCursor\" },\n\t\t\t{ src: \"Mouse-Pointers_Spinkles.png\", id: \"sprinklesCursor\" },\n\t\t\t{ src: \"Mouse-Pointers_Syringe.png\", id: \"creamCursor\" },\n\t\t\t{ src: \"Man.png\", id: \"manCursor\" },\n\t\t\t{ src: \"Moose.png\", id: \"mooseCursor\" },\n\t\t\t{ src: \"Heart.png\", id: \"heartCursor\" }\t\t];\n\t\n\t\tqueue = new createjs.LoadQueue(true, hypeDocument.resourcesFolderURL() + \"/\");\n\t\tqueue.on(\"complete\", handleFilesComplete);\n\t\tqueue.on(\"progress\", function(e){console.log('progress', e.loaded);});\n\t\tqueue.loadManifest(manifest, true);\n\n\t}\n\n\t\n\tfunction handleFilesComplete(e) {\n\t\tconsole.log('complete', e);\n\t\t\n\t\tinit();\n\t\thandleComplete();\n\t}\n\n\n\tfunction init() {\n\t\n\t\t// INIT IMAGES\n\t\tdoughImage = queue.getResult(\"doughPattern\");\n\t\tcreamImage = queue.getResult(\"creamPattern\");\n\t\tchocoImage = queue.getResult(\"chocoPattern\");\n\t\tsprinklesImage = queue.getResult(\"sprinklesPattern\");\n\t\t\n\t\tmanImage = queue.getResult(\"manImage\");\n\t\tmooseImage = queue.getResult(\"mooseImage\");\n\t\theartImage = queue.getResult(\"heartImage\");\n\t\t\n\t\t\n\t\t// UPDATE CANVAS SIZE\t\n\t\t$(gingerboard).width($(canvasWrapper).width());\n\t\t$(gingerboard).height($(canvasWrapper).height());\n\t\t\n\t\t\n\t\t// INIT CANVAS\n\t\tstage = new createjs.Stage(gingerboard);\n\t\twindow.addEventListener('resize', resize, false);\n\t\t\n\t\t// INIT CURSOR\n\t\tcursor = new createjs.Bitmap();\n\t\t\n\t\t// INIT BUTTONS\n\t\t$.each(buttons, function(index, value) {\n\t\t\n\t\t\t$(value).click(changeTool);\t\t\t\n\t\t\t\n\t\t\t$(value).mouseout(function() { \n\t\t\t\t$(this).removeClass('shake-slow'); \n\t\t\t\tif (this.id !== activeTool) {\n\t\t\t\t\t$(this).fadeTo(.4, .7);\n\t\t\t\t}\n\t\t\t\tsetHoverHint(null);\n\t\t\t});\t\t\t\n\t\t\t\n\t\t\t$(value).mouseover(function() {\n\t\t\t\t$(this).addClass('shake-slow');\n\t\t\t\t$(this).fadeTo(.4, 1);\n\t\t\t\tsetHoverHint(this);\n\t\t\t});\t\t\n\t\t\t\t\t\t\t\n\t\t});\n\t\t\n\t\t\n\t\t// SET INITIAL TOOL\n\t\tchangeTool.apply(dough);\n\t\t\n\t\t\n\t\t// HANDLE BAKE\n\t\t$(bake).click(onBakeClick);\n\t}\n\t\n\t\n\tfunction setHoverHint(host) {\n\t\t$.each(rollOverElements, function(index, value){\n\t\t\tif (host === value) {\n\t\t\t\t$(\"#\" + value.id + \"_\" + language).show();\n\t\t\t} else {\n\t\t\t\t$(\"#\" + value.id + \"_\" + language).hide();\n\t\t\t}\t\t\t\t\n\t\t});\n\t\t\n\t\tif (host) {\n\t\t\t$(\"#texts_\" + language).fadeTo(300, 1);\n\t\t} else {\n\t\t\t$(\"#texts_\" + language).fadeTo(0, 0);\n\t\t}\n\t}\n\t\n\tfunction onBakeClick() {\n\t\twindow.gingerBread = gingerboard.toDataURL();\n\t\thypeDocument.showSceneNamed('Sending');\n\t}\n\n\n\tfunction resize() { \n\t\t$(gingerboard).width($(canvasWrapper).width());\n\t\t$(gingerboard).height($(canvasWrapper).height());\n   \t\tstage.canvas.width = parseInt(canvasWrapper.style.width);\n   \t \tstage.canvas.height = parseInt(canvasWrapper.style.height);\n  \t}\n\n\n\tfunction changeTool(e) {\n\t\t\n\t\tif (activeTool === this.id) return;\n\t\tactiveTool = this.id;\n\t\t\n\t\t// SET ACTIVE CURSOR\t\n\t\tif (activeCursor !== tools[activeTool].cursor) {\n\t\t\tactiveCursor = tools[activeTool].cursor;\n\t\t\tconsole.log('activeCursor', activeCursor, cursor);\n\t\t\tcursor.image = queue.getResult(activeCursor);\n\t\t\tstage.cursor = \"none\";\t\n\t\t}\n\t\t\n\t\t$(this).removeClass('shake-slow');\n\t\t\n\t\t$.each(buttons, function(index, value)\t{\n\t\t\tif (value.id === activeTool) {\n\t\t\t\t$(value).fadeTo(.5, 1);\n\t\t\t} else {\n\t\t\t\t$(value).fadeTo(1, .7);\n\t\t\t}\n\t\t});\n\n\n\t\tactiveThickness = tools[activeTool].thickness;\n\t\tupdateThickness();\n\t\t\n\t\tcurrentDrawingFunction = tools[activeTool].drawingFX;\n\t}\n\t\n\n\tfunction handleComplete() {\n\t\n\t\tresize();\n\t\t\n\t\tcreatejs.Touch.enable(stage);\n\t\t\n\t\tdoughCanvas = new createjs.Shape();\n\t    doughCanvas.cache(0, 0, doughImage.width, doughImage.height);\n\t    \t    \n\t    otherCanvas = new createjs.Shape();\n\t    otherCanvas.cache(0, 0, doughImage.width, doughImage.height);\n\t\totherCanvas.shadow = new createjs.Shadow(\"#111111\", -2, 2, 5);\n\t\t\n\t\tbitmap = new createjs.Bitmap(doughImage);\n\t\t\n\t\tdoughMask = new createjs.AlphaMaskFilter(doughCanvas.cacheCanvas);\n\t\t\n\t\tbitmap.filters = [doughMask];\n\t    bitmap.shadow = new createjs.Shadow(\"#000000\", -2, 2, 10);\n\t\tbitmap.cache(0, 0, doughImage.width, doughImage.height);\n\t\n\t\tstage.addChild(bitmap);\n\t\tstage.addChild(otherCanvas);\n\t\tstage.addChild(cursor);\n\t\t\n\t\tstage.enableMouseOver();\n\t\tstage.addEventListener(\"mouseenter\", handleStageEntered);\n\t\tstage.addEventListener(\"mouseleave\", handleStageLeave);\n\t\tstage.addEventListener(\"stagemouseup\", handleMouseUp);\n\t\tstage.addEventListener(\"stagemousedown\", handleMouseDown);\n\t\tstage.addEventListener(\"stagemousemove\", drawingFunction);\n\t}\n\t\n\t\n\tfunction handleStageLeave() {\t\n\t\tcursor.visible = false;\n\t\tcursor.x = 0;\n\t\tcursor.y = 0;\n\t\tstage.update();\n\t}\n\t\n\t\n\tfunction handleStageEntered() {\n\t\tstage.cursor = \"none\";\n\t\tcursor.visible = true;\n\t\tcursor.x = stage.mouseX - cursor.image.width/2 + 6;\n\t\tcursor.y = stage.mouseY - cursor.image.height/2 - 6;\n\t}\n\t\n\t\t\n\tfunction addGingerBread() {\t\n\t\n\t\tvar img;\n\t\tif (activeTool === 'man') {\n\t\t\timg = manImage;\n\t\t} else if (activeTool === 'moose') {\n\t\t\timg = mooseImage;\n\t\t} else if (activeTool === 'heart') {\n\t\t\timg = heartImage;\n\t\t}\n\t\n\t\tvar posX = (img.width * lineThickness) / 2;\n\t\tvar posY = (img.height * lineThickness) / 2;\n\t\tvar matrix = new createjs.Matrix2D().translate(stage.mouseX-posX, stage.mouseY-posY).scale(lineThickness, lineThickness);\n\t\n\t\tdoughCanvas\n\t\t\t.graphics\n\t\t\t.clear()\n\t\t\t.beginBitmapFill(img, \"no-repeat\", matrix)\n\t\t\t.drawRect(stage.mouseX - img.width/2, stage.mouseY - img.height/2, img.width, img.height);\n\n\t\t// update canvas\n\t\tdoughCanvas.updateCache(\"source-over\");\n\t\tbitmap.updateCache();\t\n\t\tstage.update();\n\t}\n\t\t\n\t\t\n\tfunction handleMouseDown(event) {\n\t\n\t\tif (!currentDrawingFunction) {\n\t\t\taddGingerBread();\n\t\t\treturn;\n\t\t}\n\t\n\t\toldPt = new createjs.Point(stage.mouseX, stage.mouseY);\n\t\toldMidPt = oldPt;\n\t\tisDrawing = true;\n\t\t\n\t\tsprinkleCounter = 0;\n\t\t\n\t\tif (isInsideCanvas()) {\n\t\t\tdrawingFunction(null, true);\n\t\t}\n\t}\n\t\n\t\n\tfunction isInsideCanvas(){\n\t\treturn \tstage.mouseX > 35 && \n\t\t\t\tstage.mouseY > 45 && \n\t\t\t\tstage.mouseX < stage.canvas.width - 35 && \n\t\t\t\tstage.mouseY < stage.canvas.height - 45;\n\t}\n\t\n\t\n\tfunction updateCursor() {\n\t\tcursor.x = stage.mouseX - cursor.image.width/2 + 6;\n\t\tcursor.y = stage.mouseY - cursor.image.height/2 - 6;\n\t\tstage.cursor = \"none\";\n\t}\n\t\n\t\n\tfunction updateCursor2() {\n\t\tcursor.x = stage.mouseX;\n\t\tcursor.y = stage.mouseY;\n\t\tstage.cursor = \"none\";\n\t}\n\t\n\t\n\tfunction drawingFunction(e, forced) {\t\n\t\tif (!currentDrawingFunction) {\n\t\t\tupdateCursor2();\n\t\t\tstage.update();\n\t\t\treturn;\n\t\t}\n\t\t\n\t\tupdateCursor();\n\t\n\t\tif (!isDrawing && !forced) {\n\t\t\tstage.update();\n\t\t\treturn;\n\t\t}\n\n\t\t// current midpoint\n\t\tmidPoint = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);\n\t\t\n\t\t// custom drawing\n\t\tif (/*isInsideCanvas() &&*/ currentDrawingFunction) {\n\t\t\tcurrentDrawingFunction(forced);\t\n\t\t}\n\t\t\n\t\t// update params\n\t\toldPt.x = stage.mouseX;\n\t\toldPt.y = stage.mouseY;\n\t\n\t\toldMidPt.x = midPoint.x;\n\t\toldMidPt.y = midPoint.y;\n\t\t\n\t\t// update stage\n\t\tstage.update();\n\n\t}\n\t\n\t\n\t// SPRINKLES\n\tfunction drawSprinkles(forced) {\n\t\n\t\tsprinkleCounter++;\n\t\tif (sprinkleCounter%10 !== 0 && !forced) return;\n\t\t\n\t\tvar num = Math.floor(Math.random() * 3) + 1;\n\t\tvar image = queue.getResult(\"sprinkles\" + num);\n\t\tvar rotation = Math.floor(Math.random() * 360) + 1;\n\t\t\n\t\totherCanvas\n\t\t\t.graphics\n\t\t\t.clear()\n\t\t\t.beginBitmapFill(image, \"repeat\", new createjs.Matrix2D().rotate(rotation).scale(.4, .4))\n\t\t\t.drawCircle(midPoint.x, midPoint.y, image.width/3);\n\n\t\t// update canvas\n\t\totherCanvas.updateCache(\"source-over\");\t\t\n\t}\n\n\t\n\t// DOUGH\n\tfunction drawDough() {\n\t\n\t\tdoughCanvas\n\t\t\t.graphics\n\t\t\t.clear()\n\t\t\t.setStrokeStyle(lineThickness, \"round\", \"round\")\n\t\t\t.beginStroke(\"#FFFFFF\")\n\t\t\t.moveTo(midPoint.x, midPoint.y)\n\t\t\t.curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);\n\t\t\t\t\n\t\tdoughCanvas.updateCache(\"source-over\");\n\t\tbitmap.updateCache();\n\t}\n\t\n\t\n\t// ERASER\n\tfunction erase() {\n\t\n\t\tdoughCanvas\n\t\t\t.graphics\n\t\t\t.clear()\n\t\t\t.setStrokeStyle(lineThickness, \"round\", \"round\")\n\t\t\t.beginStroke(\"#FFFFFF\")\n\t\t\t.moveTo(midPoint.x, midPoint.y)\n\t\t\t.curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);\n\t\t\t\n\t\tdoughCanvas.updateCache(\"destination-out\");\n\t\tbitmap.updateCache();\n\t\t\t\t\n\t\totherCanvas\n\t\t\t.graphics\n\t\t\t.clear()\n\t\t\t.setStrokeStyle(lineThickness, \"round\", \"round\")\n\t\t\t.beginStroke(\"#FFFFFF\")\n\t\t\t.moveTo(midPoint.x, midPoint.y)\n\t\t\t.curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);\t\n\t\totherCanvas.updateCache(\"destination-out\");\n\t}\n\t\n\t\n\t// CREAM\n\tfunction drawCream() {\n\t\totherCanvas\n\t\t\t.graphics\n\t\t\t.clear()\n\t\t\t.setStrokeStyle(lineThickness, \"round\", \"round\")\n\t\t\t.beginBitmapStroke(creamImage)\n\t\t\t.moveTo(midPoint.x, midPoint.y)\n\t\t\t.curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);\n\n\t\t// update canvas\n\t\totherCanvas.updateCache(\"source-over\");\n\t}\n\t\n\t\n\t// CHOCO\n\tfunction drawChocolate() {\n\t\totherCanvas\n\t\t\t.graphics\n\t\t\t.clear()\n\t\t\t.setStrokeStyle(lineThickness, \"round\", \"round\")\n\t\t\t.beginBitmapStroke(chocoImage)\n\t\t\t.moveTo(midPoint.x, midPoint.y)\n\t\t\t.curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);\n\n\t\t// update canvas\n\t\totherCanvas.updateCache(\"source-over\");\n\t} \n\n\t\n\tfunction handleMouseUp(event) {\n\t\tisDrawing = false;\n\t}\n\n\t\n}",identifier:"46"},{name:"onSendLoad",source:"function(hypeDocument, element, event) {\t\n\tvar bgSend = hypeDocument.getElementById('bgSend')\n\tvar sender = hypeDocument.getElementById('sender');\n\tvar receiver = hypeDocument.getElementById('receiver');\n\tvar message = hypeDocument.getElementById('messageText');\n\tvar imgWrap = hypeDocument.getElementById('imageWrapper');\n\tvar img = hypeDocument.getElementById('image');\n\t\n\t$('#sendButton').click(function() {\n\t\tvar data = { \timg: window.gingerBread, \n\t\t\t\t\t\tto: $(receiver).val(), \n\t\t\t\t\t\tfrom: $(sender).val(),\n\t\t\t\t\t\tgreeting: $(message).val() \n\t\t\t\t\t};\n\n\t\t$.post(\"php/send.php\", data, function(response) {\n\t\t\tif (response == \"ok\"){\n\t\t\t\t$('#overlay').fadeTo(1, 1);\n\t\t\t} else {\n\t\t\t\t\n\t\t\t}\n\t\t});\n\t\t\n\t});\n\t\n\t\n\twindow.addEventListener('resize', onResize);\n\t\n\timg.src = window.gingerBread;\n\t\n\tsetTimeout(onResize, 10);\n\t\n\tfunction onResize() {\n\t\tvar scale = $(bgSend).width()/1920;\n\t\tvar newSize = 3 + parseInt(16 * scale);\n\t\t\n\t\t$(sender).css(\"fontSize\", newSize);\n\t\t$(sender).css(\"size\", newSize);\n\t\t\n\t\t$(receiver).css(\"fontSize\", newSize);\n\t\t$(receiver).css(\"size\", newSize);\n\t\n\t\t$(message).css(\"width\", scale * 317);\n\t\t$(message).css(\"fontSize\", newSize);\n\t\t$(message).css(\"lineHeight\", 10 + (scale * 16) + \"px\");\n\t\t\n\t\t$(img).width($(imgWrap).width());\n\t\t$(img).height($(imgWrap).height());\t\n\t}\n\t\n}",identifier:"177"},{name:"onReceiveLoad",source:"function(hypeDocument, element, event) {\t\n\tvar bgReceive = hypeDocument.getElementById('bgReceive');\n\tvar sender = hypeDocument.getElementById('fromName');\n\tvar message = hypeDocument.getElementById('greetingText');\n\tvar bake = hypeDocument.getElementById('bakeYourOwn');\n\tvar imgWrap = hypeDocument.getElementById('receivedImageWrapper');\n\tvar img = hypeDocument.getElementById('receivedImage');\n\t\n\t\n\twindow.addEventListener('resize', onResize);\n\t\n\timg.src = './img/' + window.receivedImage;\n\t\n\t$(message).text(window.greeting);\n\t$(sender).text(window.senderName);\n\n\t$(bake).click(function(){\n\t\thypeDocument.showSceneNamed('Making');\n\t});\n\t\n\tsetTimeout(onResize, 50);\n\t\n\tfunction onResize() {\n\t\tvar scale = $(bgReceive).width()/1920;\n\t\tvar newSize = 8 + 18 * scale;\n\n\t\t$(sender).css(\"fontSize\", newSize);\n\t\t\t\n\t\t$(message).css(\"width\", scale * 317);\n\t\t$(message).css(\"fontSize\", newSize * .7);\n\t\t$(message).css(\"lineHeight\", 9 + (scale * 16) + \"px\");\n\t\t$(message).css(\"maxHeight\", (10 + (scale * 16)) * 5);\n\t\t\n\t\t$(img).width($(imgWrap).width());\n\t\t$(img).height($(imgWrap).height());\t\n\t}\n\n\n}",identifier:"201"},{name:"onEntranceLoad",source:"function(hypeDocument, element, event) {\t\n\tvar parseQueryString = function(url) {\n  \t\tvar urlParams = {};\n\t  \turl.replace(new RegExp(\"([^?=&]+)(=([^&]*))?\", \"g\"),\n    \t\t\t\tfunction($0, $1, $2, $3) { urlParams[$1] = $3; });\n  \t\treturn urlParams;\n\t}\n\t\n\thypeDocument.showSceneNamed('Intro');\n\treturn;\n\t\n\tvar params = parseQueryString(location.search);\n\tconsole.info(JSON.stringify(params));\n\t\n\tif (params.img && params.img.indexOf('.png')) {\n\t\twindow.senderName = params.from;\n\t\twindow.greeting = params.greeting;\n\t\twindow.receivedImage = params.img;\n\t\t\n\t\thypeDocument.showSceneNamed('Receiving');\n\t} else {\n\t\thypeDocument.showSceneNamed('Making');\n\t}\n\t\n}",identifier:"212"}];d={};g={};for(a=0;a<b.length;a++)try{g[b[a].identifier]=b[a].name,d[b[a].name]=eval("(function(){return "+b[a].source+"})();")}catch(m){window.console&&window.console.log(m),d[b[a].name]=
function(){}}a=new HYPE_584(c,e,{"60":{p:1,n:"Krikums_1.png",g:"133",t:"@1x"},"-2":{n:"blank.gif"},"47":{p:1,n:"TXT_L2_s%CC%8Cokola%CC%84de.png",g:"97",t:"@1x"},"54":{p:1,n:"TXT_R4_Briedis.png",g:"104",t:"@1x"},"61":{p:1,n:"Krikums_2.png",g:"134",t:"@1x"},"48":{p:1,n:"TXT_L3_Glazu%CC%84ra.png",g:"98",t:"@1x"},"55":{p:1,n:"Moose.png",g:"116",t:"@1x"},"62":{p:1,n:"Krikums_3.png",g:"135",t:"@1x"},"49":{p:1,n:"TXT_L4_Kl%CC%A7u%CC%84mes.png",g:"99",t:"@1x"},"56":{p:1,n:"MainBackground.jpg",g:"5",t:"@1x"},"63":{p:1,n:"Krikums_4.png",g:"136",t:"@1x"},"70":{p:1,n:"Button_Uzcep.png",g:"206",t:"@1x"},"57":{p:1,n:"Bake_postCard_briedis_2.png",g:"127",t:"@1x"},"64":{p:1,n:"Krikums_5.png",g:"137",t:"@1x"},"71":{p:1,n:"into-english.jpg",g:"216",t:"@1x"},"58":{p:1,n:"Bake_postCard_squalio_2.png",g:"128",t:"@1x"},"65":{p:1,n:"Krikums_putni.png",g:"138",t:"@1x"},"0":{p:1,n:"Slider_tree.png",g:"13",t:"@1x"},"59":{p:1,n:"Bake_postCard_TXT.png",g:"129",t:"@1x"},"66":{p:1,n:"Krikums_Zvaigzne1.png",g:"139",t:"@1x"},"1":{p:1,n:"Slider_Pinecone.png",g:"15",t:"@1x"},"2":{p:1,n:"Right_4_Moose.png",g:"17",t:"@1x"},"67":{p:1,n:"S%CC%8Ck%CC%A7i%CC%84vis.png",g:"169",t:"@1x"},"3":{p:1,n:"Right_3_Heart.png",g:"19",t:"@1x"},"68":{p:1,n:"Button_send.png",g:"178",t:"@1x"},"4":{p:1,n:"Right_2_Man.png",g:"21",t:"@1x"},"5":{p:1,n:"Right_1_art.png",g:"23",t:"@1x"},"69":{p:1,n:"BakeReceive_postCard_Lat_TXT.png",g:"202",t:"@1x"},"6":{n:"jquery-3.2.1.min.js"},"7":{n:"jquery-ui.min.css"},"10":{n:"easeljs-NEXT.js"},"8":{n:"jquery-ui.min.js"},"9":{p:1,n:"doughPattern.jpg",g:"50",o:true,t:"@1x"},"11":{p:1,n:"creamPattern.jpg",g:"54",t:"@1x"},"12":{p:1,n:"doughPattern2.jpg",g:"55",t:"@1x"},"13":{n:"glowfilter.min.js"},"20":{n:"csshake.min.css"},"21":{p:1,n:"delis.png",g:"35",t:"@1x"},"14":{p:1,n:"doughPattern3.jpg",g:"56",t:"@1x"},"22":{p:1,n:"Mouse-Pointers_Brush.png",g:"65",t:"@1x"},"15":{p:1,n:"chocoPattern2.jpg",g:"58",t:"@1x"},"30":{p:1,n:"Left_2_Brush_2.png",g:"77",t:"@1x"},"23":{p:1,n:"Mouse-Pointers_Spinkles.png",g:"66",t:"@1x"},"16":{p:1,n:"sprinklesPattern3.jpg",g:"61",t:"@1x"},"31":{p:1,n:"Left_2_Chocolate_2.png",g:"78",t:"@1x"},"24":{p:1,n:"Mouse-Pointers_Syringe.png",g:"67",t:"@1x"},"17":{p:1,n:"sprinkles1.png",g:"62",t:"@1x"},"32":{p:1,n:"Left_1_Sprinkles_2.png",g:"79",t:"@1x"},"25":{p:1,n:"Heart.png",g:"72",t:"@1x"},"18":{p:1,n:"sprinkles2.png",g:"63",t:"@1x"},"40":{p:1,n:"TXT_R1_Custom.png",g:"90",t:"@1x"},"33":{p:1,n:"button-bake-lv.png",g:"81",t:"@1x"},"26":{p:1,n:"Man.png",g:"73",t:"@1x"},"19":{p:1,n:"sprinkles3.png",g:"64",t:"@1x"},"41":{p:1,n:"TXT_R2_Gman.png",g:"91",t:"@1x"},"34":{n:"preloadjs-0.6.2.min.js"},"27":{p:1,n:"Left_2_Knife.png",g:"74",t:"@1x"},"42":{p:1,n:"TXT_R3_Heart.png",g:"92",t:"@1x"},"35":{p:1,n:"TXT_BakeIt.png",g:"85",t:"@1x"},"28":{p:1,n:"Left_3_Syringe_2.png",g:"75",t:"@1x"},"43":{p:1,n:"TXT_R4_Deer.png",g:"93",t:"@1x"},"50":{p:1,n:"TXT_LiecKra%CC%84snin%CC%A7a%CC%84.png",g:"100",t:"@1x"},"36":{p:1,n:"TXT_L1_Sprinkles.png",g:"86",t:"@1x"},"29":{p:1,n:"Left_3_Smile_2.png",g:"76",t:"@1x"},"44":{p:1,n:"TXT_Size.png",g:"94",t:"@1x"},"51":{p:1,n:"TXT_R1_Pats.png",g:"101",t:"@1x"},"37":{p:1,n:"TXT_L2_Chocolate.png",g:"87",t:"@1x"},"45":{p:1,n:"TXT_Izme%CC%84rs.png",g:"95",t:"@1x"},"52":{p:1,n:"TXT_R2_Vi%CC%84rin%CC%A7s%CC%8C.png",g:"102",t:"@1x"},"38":{p:1,n:"TXT_L3_Glaze.png",g:"88",t:"@1x"},"-1":{n:"PIE.htc"},"46":{p:1,n:"TXT_L1_Uzber.png",g:"96",t:"@1x"},"39":{p:1,n:"TXT_L4_Mistakes.png",g:"89",t:"@1x"},"53":{p:1,n:"TXT_R3_Sirds.png",g:"103",t:"@1x"}},h,[],d,[{n:"Entrance",o:"123",X:[0]},{n:"Intro",o:"213",X:[1]},{n:"Making",o:"1",X:[2]},{n:"Sending",o:"153",X:[3]},{n:"Receiving",o:"180",X:[4]}],[{o:"125",A:{a:[{p:4,h:"212"}]},p:"600px",a:100,Y:1920,Z:1080,b:100,cA:false,c:"#FFFFFF",L:[],bY:1,d:1920,U:{},T:{kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Main Timeline",z:0,b:[],a:[],f:30}},bZ:180,O:[],n:"Untitled Layout","_":0,v:{}},{o:"215",p:"600px",a:100,Y:1920,Z:1080,b:100,cA:false,c:"#FFFFFF",L:[],bY:1,d:1920,U:{},T:{kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Main Timeline",z:0,b:[],a:[],f:30}},bZ:180,O:["221","223","222"],n:"Untitled Layout","_":1,v:{"221":{h:"216",p:"no-repeat",x:"visible",a:0,q:"100% 100%",b:0,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:1080,bF:"223",c:1920,r:"inline"},"222":{c:177,bS:82,d:177,I:"Solid",e:0,J:"Solid",bD:"auto",K:"Solid",g:"#E8EBED",L:"Solid",aP:"pointer",M:1,N:1,aI:"50%",aA:{a:[{d:1.1000000000000001,p:1,g:1,e:"1"}]},O:1,A:"#D8DDE4",x:"visible",aJ:"50%",j:"absolute",dB:"button",z:2,C:"#D8DDE4",D:"#D8DDE4",aK:"50%",k:"div",B:"#D8DDE4",bF:"223",a:395,aL:"50%",P:1,b:841},"223":{k:"div",x:"visible",c:1920,d:1080,z:1,a:0,j:"absolute",bS:119,b:0}}},{o:"3",A:{a:[{p:4,h:"46"}]},p:"600px",a:100,Y:1920,Z:1080,b:100,cA:false,c:"#FFFFFF",L:[],bY:1,d:1920,U:{},T:{kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Main Timeline",z:0,b:[],a:[],f:30}},bZ:180,O:["225","224","235","226","228","231","250","247","253","252","251","249","245","246","244","248","254","256","257","255","240","232","234","227","233","236","237","230","239","238","229","242","241","243"],n:"Untitled Layout","_":2,v:{"231":{k:"div",x:"visible",bF:"224",c:382,d:1007,z:4,a:26,j:"absolute",bS:126,b:40},"239":{h:"74",p:"no-repeat",x:"visible",a:41,q:"100% 100%",b:709,j:"absolute",dB:"img",z:8,k:"div",bS:82,d:304,i:"knife",cQ:1,aP:"pointer",bF:"231",c:299,r:"inline",cR:1},"250":{h:"87",p:"no-repeat",x:"visible",a:-116,q:"100% 100%",b:-2,j:"absolute",dB:"img",z:6,k:"div",bS:82,d:75,i:"choco_en",cQ:1,bF:"244",c:632,r:"inline",cR:1},"226":{k:"div",x:"visible",bF:"224",c:276,d:1080,z:11,a:1644,j:"absolute",bS:123,b:0},"245":{h:"90",p:"no-repeat",x:"visible",i:"dough_en",q:"100% 100%",b:0,a:0,j:"absolute",z:10,k:"div",bS:82,d:98.859300000000005,dB:"img",bF:"244",c:382,r:"inline"},"232":{x:"visible",bS:82,i:"choco",a:25,j:"absolute",bF:"231",c:308,k:"div",z:4,d:301,b:229,aP:"pointer"},"251":{h:"92",p:"no-repeat",x:"visible",i:"heart_en",q:"100% 100%",b:0,a:-28,j:"absolute",z:2,k:"div",bS:82,d:84,dB:"img",bF:"244",c:455,r:"inline"},"227":{h:"21",p:"no-repeat",x:"visible",bS:82,q:"100% 100%",b:273,a:0,j:"absolute",z:3,k:"div",dB:"img",d:269,i:"man",bF:"226",aP:"pointer",c:235,r:"inline"},"246":{w:"",h:"94",p:"no-repeat",x:"visible",bS:82,q:"100% 100%",b:0,a:0,j:"absolute",z:9,k:"div",dB:"img",d:115,i:"slider_en",bF:"244",c:382,r:"inline"},"233":{w:"",h:"78",p:"no-repeat",x:"visible",bS:82,q:"100% 100%",b:18,a:0,j:"absolute",z:1,k:"div",dB:"img",d:159,bF:"232",c:182,r:"inline"},"252":{h:"86",p:"no-repeat",x:"visible",a:-27,q:"100% 100%",b:3,j:"absolute",dB:"img",z:7,k:"div",bS:82,d:105,i:"sprinkles_en",cQ:1,bF:"244",c:436,r:"inline",cR:1},"228":{w:"",h:"23",p:"no-repeat",x:"visible",a:41,q:"100% 100%",b:0,j:"absolute",dB:"img",z:4,k:"div",bS:114,d:269,i:"dough",bF:"226",aP:"pointer",c:235,r:"inline"},"247":{h:"89",p:"no-repeat",x:"visible",a:-105,q:"100% 100%",b:1,j:"absolute",dB:"img",z:4,k:"div",bS:82,d:112,i:"knife_en",cQ:1,bF:"244",c:592,r:"inline",cR:1},"234":{w:"",h:"77",p:"no-repeat",x:"visible",bS:82,q:"100% 100%",b:0,a:55,j:"absolute",z:2,k:"div",dB:"img",d:301,bF:"232",c:253,r:"inline"},"253":{h:"91",p:"no-repeat",x:"visible",i:"man_en",q:"100% 100%",b:-1,a:-50,j:"absolute",z:3,k:"div",bS:82,d:116,dB:"img",bF:"244",c:500,r:"inline"},"229":{h:"17",p:"no-repeat",x:"visible",bS:82,q:"100% 100%",b:811,a:6,j:"absolute",z:1,k:"div",dB:"img",d:269,i:"moose",bF:"226",aP:"pointer",c:235,r:"inline"},"240":{c:910,bS:82,d:680,I:"None",J:"None",K:"None",L:"None",aP:"pointer",M:0,i:"canvasWrapper",w:"<canvas id=\"gingerboard\" width=\"910\" height=\"680\"></canvas>",N:0,A:"#000000",x:"visible",j:"absolute",B:"#000000",k:"div",O:0,C:"#000000",z:13,bF:"224",D:"#000000",P:0,a:531,b:201},"248":{h:"88",p:"no-repeat",x:"visible",i:"cream_en",q:"100% 100%",b:-2,a:53,j:"absolute",z:5,k:"div",bS:82,d:115,dB:"img",bF:"244",c:275,r:"inline"},"235":{h:"79",p:"no-repeat",x:"visible",a:-16,q:"100% 100%",b:-38,j:"absolute",dB:"img",z:7,k:"div",bS:118,d:314,i:"sprinkles",cQ:1,aP:"pointer",bF:"231",c:344,r:"inline",cR:1},"254":{h:"85",p:"no-repeat",x:"visible",i:"bake_en",q:"100% 100%",b:1,a:65,j:"absolute",z:8,k:"div",bS:82,d:76,dB:"img",bF:"244",c:269,r:"inline"},"241":{k:"div",x:"visible",bF:"224",c:382,d:149,z:17,i:"slider",a:1011,j:"absolute",bS:82,b:916},"249":{h:"93",p:"no-repeat",x:"visible",i:"moose_en",q:"100% 100%",b:0,a:-22,j:"absolute",z:1,k:"div",bS:82,d:116,dB:"img",bF:"244",c:394,r:"inline"},"236":{x:"visible",bS:82,i:"cream",a:-23,j:"absolute",bF:"231",c:318,k:"div",z:1,d:372,b:489,aP:"pointer"},"255":{h:"35",p:"no-repeat",x:"visible",a:461,q:"100% 100%",b:185,j:"absolute",bS:82,z:12,k:"div",dB:"img",d:731,bF:"224",c:998,r:"inline"},"242":{w:"",h:"13",p:"no-repeat",x:"visible",a:0,q:"100% 100%",b:0,j:"absolute",dB:"img",z:1,k:"div",bS:18,d:149,i:"tree",bF:"241",aP:"pointer",c:382,r:"inline"},"237":{w:"",h:"75",p:"no-repeat",x:"visible",a:68,q:"100% 100%",b:12,j:"absolute",dB:"img",z:2,k:"div",bS:82,d:292,bF:"236",cQ:1,c:331,r:"inline",cR:1},"256":{h:"81",p:"no-repeat",x:"visible",a:1269,q:"100% 100%",b:128,j:"absolute",bS:82,z:14,k:"div",dB:"img",d:236,bF:"224",c:273,r:"inline"},"224":{k:"div",x:"visible",c:1920,d:1080,z:1,r:"inline",a:0,j:"absolute",bS:119,b:0},"243":{p:"no-repeat",c:76,q:"100% 100%",bS:82,d:86,r:"inline",bD:"auto",aP:"pointer",h:"15",i:"cone",bF:"241",j:"absolute",x:"visible",aA:{a:[{p:4}]},k:"div",aB:{a:[{p:0}]},dB:"img",z:2,a:190,b:30},"230":{w:"",h:"19",p:"no-repeat",x:"visible",a:0,q:"100% 100%",b:551,j:"absolute",dB:"img",z:2,k:"div",bS:82,d:269,i:"heart",bF:"226",aP:"pointer",c:235,r:"inline"},"238":{w:"",h:"76",p:"no-repeat",x:"visible",bS:82,q:"100% 100%",b:270,a:73,j:"absolute",z:1,k:"div",dB:"img",d:58,bF:"236",c:148,r:"inline"},"257":{c:178,bS:82,d:161,I:"Solid",e:0,J:"Solid",K:"Solid",g:"#E8EBED",L:"Solid",aP:"pointer",M:1,i:"bake",N:1,aI:"50%",A:"#D8DDE4",O:1,x:"visible",j:"absolute",aJ:"50%",k:"div",C:"#D8DDE4",z:18,B:"#D8DDE4",D:"#D8DDE4",aK:"50%",bF:"224",P:1,a:1323,aL:"50%",b:155},"225":{h:"5",p:"no-repeat",x:"hidden",a:0,q:"100% 100%",b:0,j:"absolute",bS:119,z:1,k:"div",dB:"img",d:1080,bF:"224",c:1920,r:"inline"},"244":{x:"visible",i:"texts_en",a:795,bS:82,j:"absolute",cY:"1",bF:"224",k:"div",c:382,d:115,z:19,b:70}}},{o:"155",A:{a:[{p:4,h:"177"}]},p:"600px",a:100,Y:1920,Z:1080,b:100,cA:false,c:"#FFFFFF",L:[],bY:1,d:1920,U:{},T:{kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Main Timeline",z:0,b:[],a:[],f:30}},bZ:180,O:["277","258","259","260","269","265","267","268","271","276","270","266","272","273","275","274","261","262","263","264"],n:"Untitled Layout","_":3,v:{"275":{h:"178",p:"no-repeat",x:"visible",bS:82,q:"100% 100%",b:707,a:889,j:"absolute",z:9,k:"div",dB:"img",d:187,i:"sendButton",bF:"260",aP:"pointer",c:212,r:"inline"},"267":{h:"127",p:"no-repeat",x:"visible",a:244,q:"100% 100%",b:30,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:529,bF:"260",c:438,r:"inline"},"259":{w:"",h:"5",p:"no-repeat",x:"visible",bS:119,q:"100% 100%",b:0,a:0,j:"absolute",z:0,k:"div",dB:"img",d:1080,i:"bgSend",bF:"260",c:1920,r:"inline"},"271":{w:"",h:"169",p:"no-repeat",x:"visible",a:941,q:"100% 100%",b:65,j:"absolute",dB:"img",z:6,k:"div",bS:82,d:642,bF:"260",c:859,r:"inline",G:"#BE6A70"},"263":{h:"135",p:"no-repeat",x:"visible",a:1322,q:"100% 100%",b:934,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:86,bF:"260",c:98,r:"inline"},"276":{c:756,bS:82,d:448,I:"None",r:"inline",J:"None",f:13,K:"None",L:"None",aP:"pointer",M:0,i:"imageWrapper",w:"<img id=\"image\">",N:0,A:"#000000",x:"visible",j:"absolute",B:"#000000",k:"div",O:0,C:"#000000",z:11,bF:"260",D:"#000000",P:0,a:1011,b:151},"268":{h:"128",p:"no-repeat",x:"visible",a:51,q:"100% 100%",b:59,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:530,bF:"260",c:519,r:"inline"},"272":{c:305,bS:82,d:31,I:"None",s:"Helvetica,Arial,Sans-Serif",J:"None",f:354,K:"None",L:"None",M:0,w:"<input style=\"font-size: 14px; size:14px; border-style: none; color: #BE6A70; background-color:transparent; padding: 0px;\" value=\"\" placeholder=\"E-mail address\" id=\"receiver\">",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",O:0,C:"#D8DDE4",z:7,bF:"260",D:"#D8DDE4",P:0,a:345,b:550},"264":{h:"134",p:"no-repeat",x:"visible",a:1603,q:"100% 100%",b:934,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:63,bF:"260",c:67,r:"inline"},"277":{c:1918,bS:83,d:1078,I:"Solid",r:"inline",e:0,J:"Solid",bD:"none",K:"Solid",g:"rgba(0, 0, 0, 0.500)",L:"Solid",aP:"auto",M:1,i:"overlay",N:1,bF:"260",A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",O:1,C:"#D8DDE4",z:12,P:1,D:"#D8DDE4",cN:"none",a:0,b:0},"269":{h:"136",p:"no-repeat",x:"visible",a:1001,q:"100% 100%",b:0,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:115,bF:"260",c:92,r:"inline"},"260":{k:"div",x:"visible",c:1920,d:1080,z:1,a:0,j:"absolute",bS:119,b:0},"273":{c:238,bS:82,d:29,I:"None",J:"None",f:354,K:"None",L:"None",M:0,w:"<input style=\"size: 14px; font-size: 14px; border-style: none; color: #BE6A70; padding: 0px; width: 170px; background-color:transparent;\" value=\"\" placeholder=\"Your name\" id=\"sender\">",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",O:0,C:"#D8DDE4",z:8,bF:"260",D:"#D8DDE4",P:0,a:396,b:592},"265":{h:"138",p:"no-repeat",x:"visible",a:51,q:"100% 100%",b:23,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:120,bF:"260",c:167,r:"inline"},"261":{h:"133",p:"no-repeat",x:"visible",a:1394,q:"100% 100%",b:834,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:84,bF:"260",c:90,r:"inline"},"274":{c:315,bS:82,d:29,I:"None",J:"None",f:6,K:"None",L:"None",M:0,w:"<textarea style=\"line-height: 16px; resize: none; size: 15px; font-size: 15px; border-style: none; color: #FFFFFF; padding: 0px; width: 170px; background-color: transparent;\" name=\"messageText\" id=\"messageText\" cols=\"42\" rows=\"6\" placeholder=\"Your message here..\"></textarea>",N:0,A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",O:0,C:"#D8DDE4",z:10,bF:"260",D:"#D8DDE4",P:0,a:424,b:770},"266":{h:"129",p:"no-repeat",x:"visible",a:80,q:"100% 100%",b:450,j:"absolute",bS:82,z:2,k:"div",dB:"img",d:575,bF:"260",c:926,r:"inline"},"258":{c:1918,bS:119,d:1078,I:"Solid",r:"inline",J:"Solid",K:"Solid",g:"rgba(247, 251, 255, 0.000)",L:"Solid",M:1,N:1,bF:"260",A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",O:1,C:"#D8DDE4",z:0,P:1,D:"#D8DDE4",a:0,b:0},"270":{h:"137",p:"no-repeat",x:"visible",a:24,q:"100% 100%",b:420,j:"absolute",dB:"img",aA:{a:[{d:1.1000000000000001,p:1,g:1,e:"1"}]},k:"div",z:5,d:98,bS:18,bF:"260",aP:"pointer",c:86,r:"inline"},"262":{h:"139",p:"no-repeat",x:"visible",a:1680,q:"100% 100%",b:826,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:171,bF:"260",c:150,r:"inline"}}},{o:"200",A:{a:[{p:4,h:"201"}]},p:"600px",a:100,Y:1920,Z:1080,b:100,cA:false,c:"#FFFFFF",L:[],bY:1,d:1920,U:{},T:{kTimelineDefaultIdentifier:{i:"kTimelineDefaultIdentifier",n:"Main Timeline",z:0,b:[],a:[],f:30}},bZ:180,O:["283","282","278","284","289","285","281","279","295","290","291","292","293","294","288","280","287","286"],n:"Untitled Layout","_":4,v:{"281":{h:"128",p:"no-repeat",x:"visible",a:51,q:"100% 100%",b:59,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:530,bF:"278",c:519,r:"inline"},"292":{G:"#FF3025",aU:8,c:301,bS:82,d:28,aV:8,r:"inline",s:"Helvetica,Arial,Sans-Serif",f:354,t:24,Z:"break-word",v:"bold",i:"fromName",w:"From text",bF:"278",j:"absolute",x:"visible",k:"div",y:"preserve",z:9,aS:8,aT:8,a:352,b:536},"289":{h:"138",p:"no-repeat",x:"visible",a:51,q:"100% 100%",b:23,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:120,bF:"278",c:167,r:"inline"},"278":{k:"div",x:"visible",c:1920,d:1080,z:1,a:0,j:"absolute",bS:119,b:0},"284":{h:"136",p:"no-repeat",x:"visible",a:1001,q:"100% 100%",b:0,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:115,bF:"278",c:92,r:"inline"},"290":{h:"137",p:"no-repeat",x:"visible",a:24,q:"100% 100%",b:420,j:"absolute",dB:"img",aA:{a:[{d:1.1000000000000001,p:1,g:1,e:"1"}]},k:"div",z:6,d:98,bS:18,bF:"278",aP:"pointer",c:86,r:"inline"},"295":{c:756,bS:82,d:448,I:"None",J:"None",f:13,K:"None",L:"None",aP:"default",M:0,i:"receivedImageWrapper",w:"<img id=\"receivedImage\">",N:0,A:"#000000",x:"visible",j:"absolute",B:"#000000",k:"div",O:0,C:"#000000",z:13,bF:"278",D:"#000000",P:0,a:1011,b:151},"287":{h:"135",p:"no-repeat",x:"visible",a:1322,q:"100% 100%",b:934,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:86,bF:"278",c:98,r:"inline"},"282":{c:1918,bS:119,d:1078,I:"Solid",r:"inline",J:"Solid",K:"Solid",g:"rgba(247, 251, 255, 0.000)",L:"Solid",M:1,N:1,bF:"278",A:"#D8DDE4",x:"visible",j:"absolute",B:"#D8DDE4",k:"div",O:1,C:"#D8DDE4",z:0,P:1,D:"#D8DDE4",a:0,b:0},"293":{G:"#FFFFFF",aU:8,c:316,bS:82,d:195,aV:8,r:"inline",s:"Helvetica,Arial,Sans-Serif",f:6,t:24,Y:31,Z:"break-word",i:"greetingText",w:"Apsveikuma teksts, k\u0101 redza<br>Vair\u0101k\u0101s rind\u0101s<br>Kam\u0113r nepietr\u016bkst<br>rindas<br>\u0161im&nbsp;<br>tekstam<br>",bF:"278",j:"absolute",x:"visible",k:"div",y:"preserve",z:15,aS:8,aT:8,a:399,b:691},"279":{w:"",h:"169",p:"no-repeat",x:"visible",a:941,q:"100% 100%",b:65,j:"absolute",dB:"img",z:7,k:"div",bS:82,d:642,bF:"278",c:859,r:"inline",G:"#BE6A70"},"280":{h:"139",p:"no-repeat",x:"visible",a:1680,q:"100% 100%",b:826,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:171,bF:"278",c:150,r:"inline"},"285":{h:"127",p:"no-repeat",x:"visible",a:244,q:"100% 100%",b:30,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:529,bF:"278",c:438,r:"inline"},"291":{h:"202",p:"no-repeat",x:"visible",a:66,q:"100% 100%",b:450,j:"absolute",bS:82,z:3,k:"div",dB:"img",d:543,bF:"278",c:940,r:"inline"},"288":{h:"133",p:"no-repeat",x:"visible",a:1394,q:"100% 100%",b:834,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:84,bF:"278",c:90,r:"inline"},"283":{w:"",h:"5",p:"no-repeat",x:"visible",bS:119,q:"100% 100%",b:0,a:0,j:"absolute",z:1,k:"div",dB:"img",d:1080,i:"bgReceive",bF:"278",c:1920,r:"inline"},"294":{h:"206",p:"no-repeat",x:"visible",a:838,q:"100% 100%",b:687,j:"absolute",dB:"img",aA:{a:[{d:1.1000000000000001,p:1,g:1,e:"1"}]},k:"div",z:12,d:232,bS:82,bF:"278",aP:"pointer",c:263,r:"inline"},"286":{h:"134",p:"no-repeat",x:"visible",a:1603,q:"100% 100%",b:934,j:"absolute",bS:82,z:1,k:"div",dB:"img",d:63,bF:"278",c:67,r:"inline"}}}],{},g,{},
(function (shouldShow, mainContentContainer) {
	var loadingPageID = mainContentContainer.id + "_loading";
	var loadingDiv = document.getElementById(loadingPageID);

	if(shouldShow == true) {
		if(loadingDiv == null) {	
			loadingDiv = document.createElement("div");
			loadingDiv.id = loadingPageID;
			loadingDiv.style.cssText = "overflow:hidden;position:absolute;width:150px;top:40%;left:0;right:0;margin:auto;padding:2px;border:3px solid #BBB;background-color:#EEE;border-radius:10px;text-align:center;font-family:Helvetica,Sans-Serif;font-size:13px;font-weight:700;color:#AAA;z-index:100000;";
			loadingDiv.innerHTML = "Loading";
			mainContentContainer.appendChild(loadingDiv);
		}
 
		loadingDiv.style.display = "block";
		loadingDiv.removeAttribute("aria-hidden");
		mainContentContainer.setAttribute("aria-busy", true);
	} else {
		loadingDiv.style.display = "none";
		loadingDiv.setAttribute("aria-hidden", true);
		mainContentContainer.removeAttribute("aria-busy");
	}
})

,false,false,-1,true,true,true,true);f[c]=a.API;document.getElementById(e).setAttribute("HYP_dn",
c);a.z_o(this.body)})();})();