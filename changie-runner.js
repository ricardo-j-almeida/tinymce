const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const modules = process.argv[2];
const command = process.argv.slice(3).join(' ');

if (!modules || !command) {
    console.error('Module and command are required.');
    process.exit(1);
}

function executeChangie(modulePath, command) {
    try {
        execSync(`cd ${modulePath} && changie ${command}`, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error executing changie ${command} in ${modulePath}:`, error);
    }
}

if (modules === 'all') {
    // Run the command for all folders in the modules directory
    const modulesDir = './modules';
    const folders = fs.readdirSync(modulesDir).filter(dir => fs.statSync(path.join(modulesDir, dir)).isDirectory());
    
    folders.forEach(folder => {
        console.log(`Executing changie ${command} for module: ${folder}`);
        executeChangie(path.join(modulesDir, folder), command);
    });
} else {
    executeChangie(`./modules/${modules}`, command);
}
