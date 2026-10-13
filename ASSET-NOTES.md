# Actual project assets

All public project media comes from Lorenzo Lanzo’s supplied `Actual Projects/` folder or the thesis within it. The original files remain unchanged.

## Contact QR code

`assets/images/linkedin-qr.png` is an unchanged copy of the user-supplied `qr-code.png`, added to the three main pages' contact sections for the supplied LinkedIn profile. It retains its original white background and square proportions in both themes.

## Images

- **EMG:** CAD render, annotated layout (the source called “Printed PCB.jpg” is a layout, not a photo), and ADS1299 block diagram. The assembled photograph is the image on PDF page 19 of the thesis, extracted without publishing the full thesis. The source named “Gemini PCB photo.jpeg” was not used because its provenance as a hardware photo was unclear.
- **Ventilator:** PCB render, populated-board image, and functional-block annotations from the ventilator project folder.
- **SoM:** front/back CAD screenshots, unboxing still, shared PCB production-batch photo, and the supplied `ADAU1701 audio SoM best photo.jpg` photograph of fabricated boards. That photograph is the main image, with `som-assembled-thumb.webp` as its 800 x 450 card/gallery preview. The batch photo is reused in the source folders but appears only once in the public gallery. Its public full-size image and thumbnail are rotated 90 degrees counterclockwise to landscape (1600 x 900 and 800 x 450).
- **Eurorack and pedal:** stills from the supplied assembly, showcase, and power-on videos. They are labeled as video stills.
- **STM32 audio:** front/back images are CAD renders despite “Photo” in the source filenames.
- Processed images are compressed to WebP, at most 1600 px, with at most 800 px thumbnails. The supplied SoM main JPEG remains unchanged at 1920 x 1080. No generated project photography remains in the published folder.
- The ADS1299 component block diagram is supplied TI material and is credited to Texas Instruments in its caption.

## Video

Ten original clips were converted to H.264 MP4, maximum 1280 px, with fast-start metadata. The three CAD rotations had black pillarboxing removed. Original recording audio is retained as AAC in the optimized copies; CAD rotations remain silent where their sources have no audio. Assembly and power-on footage is not presented as evidence of measured audio performance.

The restored `som-render.mp4` is cropped to the original 612 x 1080 render area, removing the baked-in side bars without stretching or trimming the board. Its poster is taken from the corrected video, and the page's player uses the same 17:30 aspect ratio.

## Models

Four supplied STEP assemblies were tessellated into GLB with Open CASCADE using temporary local authoring libraries: ADAU1701 SoM, STM32 audio codec, EMG acquisition, and ventilator controller. No CAD conversion dependency is part of the website. Source STEP files are included as compressed ZIP downloads. Some non-solid CAD annotations/copper objects were not exported as meshes. The ventilator export skips nodes without triangulation, including pin markers and embedded CAD objects. The current SoM model includes the supplied copper geometry; its export skips non-meshed bottom silkscreen and FPC stiffener nodes. CAD is illustrative of the designed assembly, not manufacturing or performance verification.

The GLBs were subsequently optimized for browser rendering by merging opaque faces within each mesh by material: 21,933 to 870 primitives for the current SoM model and 12,217 to 616 for the STM32 board. Ordered triangle positions and normals were compared byte for byte for each mesh/material group; materials, scene nodes, and transforms were preserved. This consolidates drawing work without simplifying the board geometry. Supplied STEP files are preserved, and STEP download contents match their source files. The standard-library helper `tools/optimize_web_models.py` lives outside the publishable site and writes to a separate output folder for inspection.

On 13 October 2026 the SoM GLB and STEP download were regenerated from the current `Actual Projects/Single projects/ADAU1701 SoM/ADAU1701_SoM.step`, rather than reusing the previous web model. Source SHA-256: `42958744d081ea2a56c05a233e8d1bd4cd327e33fba75f405d94f300f77f141f`. The updated model contains 273,095 triangles and 17 materials. Its viewer and downloads use content-version query strings to refresh browser caches. Preparation reports and the previous web assets are saved outside the site in `tmp/som-model-refresh/`.

The EMG and ventilator STEP models use the same tessellation settings and optimization: 10,513 to 550 primitives for the current EMG model and 36,123 to 1,202 for the ventilator. Indexed triangle positions and normals were verified against the unoptimized tessellation; materials and node transforms are preserved. Original STEP downloads contain the supplied files unchanged.

On 13 October 2026 the EMG GLB and STEP download were regenerated from the current `Actual Projects/Single projects/EMG Acquisition Board/ADS1299_Module_3D_MODEL.step`. Source SHA-256: `4b26579369ea3dcdd1e6d3f6746772cafabb03aad52f89de9cd7ea1a5700854b`. The updated web model contains 198,832 triangles and 31 materials. The viewer and GLB/STEP download URLs use a content-version query to refresh cached assets. The source STEP is unchanged, and the compressed download contains its exact bytes. Preparation reports and previous web assets are saved outside the site in `tmp/emg-model-refresh/`.

The effects-pedal and Eurorack models are prepared directly from the supplied OBJ/MTL ZIP archives, without converting to STEP. Both archives pass CRC checks and parse successfully. All 307,069 pedal triangles and 301,340 Eurorack triangles are retained, grouped into 38 and 30 material primitives respectively. Supplied MTL diffuse colors become opaque base colors with a neutral roughness of 0.65; this approximates the source shading rather than claiming photorealistic material reproduction. No textures are present in these archives.

OBJ normals are normalized; each exported vertex and nonzero normal is compared with its source after transformation and float32 encoding. Models are centered, uniformly scaled to a longest extent of one viewer unit, and rotated from Z-up to Y-up. Source OBJ units are unspecified, so the normalized web models are for visual inspection, not physical measurement. The source downloads are byte-for-byte copies of the supplied ZIP archives, including their OBJ and MTL files. Preparation and source hashes are recorded by `tools/prepare_additional_models.py`, with review outputs in `tmp/additional-models/`; neither folder is part of the website.

## Documents and content

Five schematics are copied unchanged into the optional downloads. The schematic in the Eurorack source folder describes the shared SoM core rather than a separate carrier design; its page therefore links the core schematic with an explicit label. No invented repository links, noise figures, or performance specifications were added.

Thesis content supports the EMG and ventilator pages. The EMG results are offline algorithm evaluation across four recording segments from two preterm lambs, not completed closed-loop ventilation or clinical validation. The full thesis/CV, phone number, and raw source-media folders are excluded from the publishable site. Dates follow the CV; the undated STM32 board uses “Rev. 0”.
