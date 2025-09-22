import os
import asyncio
import asyncpg
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

async def test_database_queries():
    """Test various database queries to ensure everything works correctly"""
    
    database_url = os.getenv('POSTGRES_URL')
    if not database_url:
        print("Error: POSTGRES_URL environment variable not found")
        return
    
    try:
        conn = await asyncpg.connect(database_url)
        print("🔍 Testing database queries...\n")
        
        # Test 1: Get random questions for a quiz
        print("Test 1: Getting 5 random questions")
        random_questions = await conn.fetch("""
            SELECT id, french_word, english_translation, options, correct_answer, category
            FROM public.questions 
            ORDER BY RANDOM() 
            LIMIT 5
        """)
        
        for i, q in enumerate(random_questions, 1):
            print(f"  {i}. {q['french_word']} ({q['category']})")
            print(f"     Answer: {q['correct_answer']}")
            print(f"     Options: {q['options']}")
        
        # Test 2: Get questions by category
        print(f"\nTest 2: Getting questions from 'greetings' category")
        greeting_questions = await conn.fetch("""
            SELECT french_word, english_translation, correct_answer
            FROM public.questions 
            WHERE category = 'greetings'
            LIMIT 3
        """)
        
        for q in greeting_questions:
            print(f"  {q['french_word']} = {q['correct_answer']}")
        
        # Test 3: Verify table structure
        print(f"\nTest 3: Verifying table structures")
        
        # Check questions table columns
        questions_columns = await conn.fetch("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'questions' AND table_schema = 'public'
            ORDER BY ordinal_position
        """)
        
        print("  Questions table columns:")
        for col in questions_columns:
            print(f"    {col['column_name']}: {col['data_type']}")
        
        # Test 4: Check RLS policies
        print(f"\nTest 4: Checking Row Level Security policies")
        policies = await conn.fetch("""
            SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
            FROM pg_policies 
            WHERE schemaname = 'public' AND tablename IN ('questions', 'user_progress', 'quiz_sessions')
        """)
        
        for policy in policies:
            print(f"  {policy['tablename']}.{policy['policyname']}: {policy['cmd']}")
        
        # Test 5: Sample quiz simulation data
        print(f"\nTest 5: Sample data for quiz simulation")
        sample_quiz = await conn.fetch("""
            SELECT id, french_word, options, correct_answer, category
            FROM public.questions 
            WHERE category IN ('greetings', 'numbers', 'colors')
            ORDER BY RANDOM()
            LIMIT 3
        """)
        
        print("  Sample quiz questions:")
        for i, q in enumerate(sample_quiz, 1):
            print(f"    Q{i}: What does '{q['french_word']}' mean?")
            for j, option in enumerate(q['options'], 1):
                marker = "✓" if option == q['correct_answer'] else " "
                print(f"      {j}. {option} {marker}")
        
        print(f"\n✅ All database tests completed successfully!")
        
    except Exception as e:
        print(f"❌ Error during testing: {e}")
    finally:
        if 'conn' in locals():
            await conn.close()

# Run the tests
if __name__ == "__main__":
    asyncio.run(test_database_queries())
