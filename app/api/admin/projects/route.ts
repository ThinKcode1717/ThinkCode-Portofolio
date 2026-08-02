import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'projects.json');

// Helper to ensure data directory & file exist
function readProjectsFromFile() {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE_PATH)) {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify([]), 'utf-8');
      return [];
    }
    const content = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (error) {
    console.error('Error reading projects.json:', error);
    return [];
  }
}

function writeProjectsToFile(projects: any[]) {
  const dir = path.dirname(DATA_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(projects, null, 2), 'utf-8');
}

// Simple auth token validation
function isValidAuth(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    return decoded.startsWith('thinkcode_admin_') && decoded.endsWith('_authenticated');
  } catch {
    return false;
  }
}

export async function GET() {
  const projects = readProjectsFromFile();
  return NextResponse.json({ success: true, projects });
}

export async function POST(request: Request) {
  if (!isValidAuth(request)) {
    return NextResponse.json({ success: false, error: 'Tidak memiliki otorisasi' }, { status: 401 });
  }

  try {
    const newProject = await request.json();
    if (!newProject.id || !newProject.title) {
      return NextResponse.json({ success: false, error: 'ID dan Judul proyek wajib diisi' }, { status: 400 });
    }

    const projects = readProjectsFromFile();
    const existingIndex = projects.findIndex((p: any) => p.id === newProject.id);

    if (existingIndex >= 0) {
      projects[existingIndex] = { ...projects[existingIndex], ...newProject, updatedAt: new Date().toISOString() };
    } else {
      projects.unshift({
        ...newProject,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    writeProjectsToFile(projects);
    return NextResponse.json({ success: true, project: newProject, projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Gagal menyimpan data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  return POST(request);
}

export async function DELETE(request: Request) {
  if (!isValidAuth(request)) {
    return NextResponse.json({ success: false, error: 'Tidak memiliki otorisasi' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID proyek diperlukan' }, { status: 400 });
    }

    const projects = readProjectsFromFile();
    const filtered = projects.filter((p: any) => p.id !== id);

    writeProjectsToFile(filtered);
    return NextResponse.json({ success: true, projects: filtered });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Gagal menghapus data' }, { status: 500 });
  }
}
