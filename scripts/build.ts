import { execSync } from 'child_process';

async function build() {
  try {
    console.log('Running schema generation...');
    execSync('npm run schema:generate', { stdio: 'inherit' });

    console.log('Cleaning the build directory...');
    execSync('rimraf ./build');

    console.log('Compiling TypeScript...');
    execSync('tsc -p tsconfig.build.json', { stdio: 'inherit' });

    console.log('Build complete.');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
