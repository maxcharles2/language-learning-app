import os
import asyncio
import asyncpg
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

async def run_sql_scripts():
    """Run all SQL scripts to set up and populate the database"""
    
    # Get database connection string
    database_url = os.getenv('POSTGRES_URL')
    if not database_url:
        print("Error: POSTGRES_URL environment variable not found")
        return
    
    try:
        # Connect to database
        conn = await asyncpg.connect(database_url)
        print("Connected to database successfully")
        
        # List of SQL scripts to run in order
        scripts = [
            '001_create_questions_table.sql',
            '002_create_user_progress_table.sql', 
            '003_create_quiz_sessions_table.sql',
            '004_seed_french_questions.sql'
        ]
        
        for script_name in scripts:
            script_path = f'scripts/{script_name}'
            
            # Check if script file exists
            if not os.path.exists(script_path):
                print(f"Warning: Script {script_path} not found, skipping...")
                continue
                
            # Read and execute script
            with open(script_path, 'r', encoding='utf-8') as file:
                sql_content = file.read()
                
            print(f"Running {script_name}...")
            await conn.execute(sql_content)
            print(f"✅ {script_name} completed successfully")
        
        # Verify the setup by counting records
        questions_count = await conn.fetchval("SELECT COUNT(*) FROM public.questions")
        print(f"\n📊 Database setup complete!")
        print(f"Total questions inserted: {questions_count}")
        
        # Show breakdown by category
        categories = await conn.fetch("""
            SELECT category, COUNT(*) as count 
            FROM public.questions 
            GROUP BY category 
            ORDER BY category
        """)
        
        print("\nQuestions by category:")
        for row in categories:
            print(f"  {row['category']}: {row['count']} questions")
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if 'conn' in locals():
            await conn.close()
            print("\nDatabase connection closed")

# Run the setup
if __name__ == "__main__":
    asyncio.run(run_sql_scripts())
