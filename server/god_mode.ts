import type { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const PROJECT_ROOT = process.cwd();

const CRUCIAL_FILES = [
  'package.json',
  'tailwind.config.ts',
  'vite.config.ts',
  'drizzle.config.ts',
  'tsconfig.json',
  'client/src/types/quiz.ts',
  'client/src/store/quizStore.ts',
  'client/src/data/example-quiz.ts',
  'client/src/components/quiz/QuizRenderer.tsx',
  'client/src/App.tsx',
  'client/src/main.tsx',
  'client/src/index.css',
  'client/src/lib/utils.ts',
  'client/src/lib/queryClient.ts',
  'server/index.ts',
  'server/routes.ts',
  'server/storage.ts',
  'server/vite.ts',
  'shared/schema.ts',
  'design_guidelines.md',
  'replit.md',
];

const DIRECTORIES_TO_SCAN = [
  'client/src/components/ui',
  'client/src/components/quiz/screens',
  'client/src/pages',
  'client/src/hooks',
];

function getAllFilesInDir(dirPath: string): string[] {
  const absolutePath = path.join(PROJECT_ROOT, dirPath);
  const files: string[] = [];
  
  try {
    if (!fs.existsSync(absolutePath)) {
      return files;
    }
    
    const entries = fs.readdirSync(absolutePath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js') || entry.name.endsWith('.jsx') || entry.name.endsWith('.css'))) {
        files.push(fullPath);
      } else if (entry.isDirectory()) {
        files.push(...getAllFilesInDir(fullPath));
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
  }
  
  return files;
}

function readFileContent(filePath: string): string {
  const absolutePath = path.join(PROJECT_ROOT, filePath);
  
  try {
    if (!fs.existsSync(absolutePath)) {
      return `[ARQUIVO NÃO ENCONTRADO]`;
    }
    return fs.readFileSync(absolutePath, 'utf-8');
  } catch (error) {
    return `[ERRO AO LER ARQUIVO: ${error}]`;
  }
}

export function generateFullAudit(req: Request, res: Response) {
  let auditContent = '';
  
  auditContent += '='.repeat(80) + '\n';
  auditContent += '                    SALOMÃO QUIZ ENGINE v2 - GOD MODE AUDIT\n';
  auditContent += '                    Generated: ' + new Date().toISOString() + '\n';
  auditContent += '='.repeat(80) + '\n\n';
  
  const allFiles: string[] = [...CRUCIAL_FILES];
  
  for (const dir of DIRECTORIES_TO_SCAN) {
    const filesInDir = getAllFilesInDir(dir);
    for (const file of filesInDir) {
      if (!allFiles.includes(file)) {
        allFiles.push(file);
      }
    }
  }
  
  allFiles.sort();
  
  auditContent += 'TABLE OF CONTENTS:\n';
  auditContent += '-'.repeat(40) + '\n';
  allFiles.forEach((file, index) => {
    auditContent += `${(index + 1).toString().padStart(3, ' ')}. ${file}\n`;
  });
  auditContent += '\n' + '='.repeat(80) + '\n\n';
  
  for (const filePath of allFiles) {
    auditContent += '\n\n--- FILE: ' + filePath + ' ---\n';
    auditContent += '-'.repeat(60) + '\n';
    auditContent += readFileContent(filePath);
    auditContent += '\n';
  }
  
  auditContent += '\n' + '='.repeat(80) + '\n';
  auditContent += '                    END OF AUDIT\n';
  auditContent += '                    Total files: ' + allFiles.length + '\n';
  auditContent += '='.repeat(80) + '\n';
  
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(auditContent);
}
