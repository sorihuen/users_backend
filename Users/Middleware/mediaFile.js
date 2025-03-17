const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const uploadFile = async (file, folder, publicId, type) => {
	const matches = file.match(/^data:(.+);base64,(.+)$/);
	if (!matches) {return res.status(400).json({ error: 'Formato de archivo no válido.' });}
	const buffer = Buffer.from(matches[2], 'base64');
	try {
		const result = await new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
				{
					folder: folder,
					public_id: publicId,
					resource_type: type ? type : 'auto',
					overwrite: true,
					invalidate: true,
					access_mode: 'public'
				},
				(error, result) => {
					if (error) return reject(error);
					resolve(result);
				}
			);
			stream.end(buffer);
		});

		return(result);
	} catch (error) {return null;}
}

const renameFile = async (publicId, newName, type) => {
	const originalPublicId = publicId;
	const folder = originalPublicId.substring(0, originalPublicId.lastIndexOf('/') + 1);
	const originalFileName = originalPublicId.substring(originalPublicId.lastIndexOf('/') + 1);
	const newFileName = `${folder}${newName}${originalFileName}`;

	try {
		const result = await cloudinary.uploader.rename(originalPublicId, newFileName, { resource_type: type });
		return result;
	} catch (error) { return null; }
}

const deleteFile = async (publicId) => {
	try {
		const result = await cloudinary.uploader.destroy(publicId);
		return result;
	} catch (error) { return null; }
}

module.exports = { uploadFile, renameFile, deleteFile };