import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

export const uploadFile = (req: Request, res: Response) => {
	
	if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
		return res.status(400).send({ message: 'No hay archivos que subir'});
	}

	const { file } = req.files as { file: UploadedFile};
				
	const cuttedName = file.name.split('.');

	const fileExtension = cuttedName[cuttedName.length - 1];

	const allowedExtensions = ['jpg','jpeg', 'png', 'gif'];

	if ( !allowedExtensions.includes(fileExtension) ) {
		return res.status(400).send({ message: `La extension ${fileExtension} no es valida, ${allowedExtensions.join(', ')}`});
	}
	
	const fileName = `${uuidv4()}.${fileExtension}`;
	const uploadPath = path.join(__dirname, '../../uploads/', fileName);
	
	file.mv(uploadPath, (error) => {
		if (error) return res.status(500).send({ error });		
		res.send({
			message: 'Archivo subido + ' + uploadPath,
		});
	});
}; 
