const fs = require("fs").promises;
const path = require("path");
const logger = require("./utils/logger")("file sync module");

const copyFiles = async (sourceDirectory, targetDirectory) => {
  try {
    const files = await fs.readdir(sourceDirectory);

    for (const file of files) {
      const sourcePath = path.join(sourceDirectory, file);
      const targetPath = path.join(targetDirectory, file);

      const stats = await fs.stat(sourcePath);

      if (stats.isDirectory()) {
        await fs.mkdir(targetPath, { recursive: true });
        await copyFiles(sourcePath, targetPath);

        continue;
      }

      try {
        await fs.access(targetPath);
        logger.warn(`File ${file} already exists in target folder`);
      } catch (error) {
        await fs.copyFile(sourcePath, targetPath);
        logger.info(`Success copied ${file} to target folder`);
      }
    }
  } catch (error) {
    logger.error(`Error copying scripts: ${error.message}`);
  }
};

const start = async () => {
  const sourceDirectory = path.join(__dirname, "source");
  const targetDirectory = path.join(__dirname, "target");

  await copyFiles(sourceDirectory, targetDirectory);
};

module.exports = {
  start,
};
